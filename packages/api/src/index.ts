import Fastify from 'fastify'
import cors from '@fastify/cors'
import auth from './routes/auth'
import sessions from './routes/sessions'

const app = Fastify({ logger: true })
app.register(cors, { origin: true })
app.register(auth, { prefix: '/v1/auth' })
app.register(sessions, { prefix: '/v1/sessions' })
app.get('/health', async () => ({ ok: true }))

app.listen({ port: 3001, host: '0.0.0.0' }).then(() => console.log('✅ API :3001'))
