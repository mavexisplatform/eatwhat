import { defineRailway, project, service, postgres } from "railway/iac";

export default defineRailway(() => {
  const db = postgres("postgres", {
    region: "ams"
  });

  const api = service("api", {
    replicas: 1,
    source: {
      repo: "mavexisplatform/eatwhat",
      rootDirectory: "packages/api"
    },
    env: {
      PORT: "3001",
      DATABASE_URL: { $ref: db, key: "DATABASE_URL" },
      NODE_ENV: "production"
    },
    healthcheckPath: "/health"
  });

  const web = service("web", {
    replicas: 1,
    source: {
      repo: "mavexisplatform/eatwhat",
      rootDirectory: "apps/web"
    },
    env: {
      PORT: "3000",
      NEXT_PUBLIC_API_URL: { $ref: api, key: "RAILWAY_PUBLIC_DOMAIN" },
      NODE_ENV: "production"
    }
  });

  return project("scintillating-radiance", {
    resources: [db, api, web],
  });
});
