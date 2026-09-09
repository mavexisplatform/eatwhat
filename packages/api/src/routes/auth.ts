import { FastifyInstance } from 'fastify'
import { v4 } from 'uuid'
export default async (app: FastifyInstance) => {
  app.post('/guest', async () => ({
    data: { userId: v4(), token: 'mock', isGuest: true }
  }))
}