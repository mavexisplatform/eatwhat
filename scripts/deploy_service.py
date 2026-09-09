#!/usr/bin/env python3
"""Trigger Railway deployment via GraphQL API"""
import os
import subprocess
import json
import sys

def railway_api(query):
    """Execute Railway GraphQL query"""
    result = subprocess.run(
        ['railway', 'api', query],
        capture_output=True,
        text=True
    )
    return json.loads(result.stdout)

def trigger_deploy(service_id, environment_id):
    """Trigger deployment for a service"""
    mutation = f'''
    mutation {{
      serviceDeploy(input: {{
        serviceId: "{service_id}"
        environmentId: "{environment_id}"
      }}) {{
        id
        status
      }}
    }}
    '''
    return railway_api(mutation)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: deploy_service.py <service_name>")
        sys.exit(1)
    
    service_name = sys.argv[1]
    PROJECT_ID = "a85c27a8-f089-42b6-9f23-d34f32497c70"
    ENV_ID = "d63cb11a-df6b-4ab5-9486-bd1adb38ce9d"
    
    # Get service ID
    query = f'query {{ project(id: "{PROJECT_ID}") {{ services {{ edges {{ node {{ id name }} }} }} }} }}'
    result = railway_api(query)
    
    service_id = None
    for edge in result['data']['project']['services']['edges']:
        if edge['node']['name'] == service_name:
            service_id = edge['node']['id']
            break
    
    if not service_id:
        print(f"Service {service_name} not found")
        sys.exit(1)
    
    print(f"Triggering deploy for {service_name} ({service_id})...")
    result = trigger_deploy(service_id, ENV_ID)
    print(json.dumps(result, indent=2))
