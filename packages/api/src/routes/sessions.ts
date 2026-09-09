import { FastifyInstance } from 'fastify'
import { v4 } from 'uuid'
import { db } from '../db'
import { getRest } from '../services/rest'

export default async (app: FastifyInstance) => {
  app.post('/', async (req: any) => {
    const { mode, userId } = req.body
    const s = {
      id: v4(), mode, status: 'pending', creatorId: userId,
      houseMode: Math.random() < 0.4 ? 'strict' : 'chill',
      houseOverride: false, createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now()+1800000).toISOString()
    }
    db.sessions.set(s.id, s)
    return { data: s }
  })
  
  app.get('/:id', async (req: any) => {
    const s = db.sessions.get(req.params.id)
    return s ? { data: s } : { error: 'NOT_FOUND' }
  })
  
  app.post('/:id/context', async (req: any) => {
    const s = db.sessions.get(req.params.id)
    if (!s) return { error: 'NOT_FOUND' }
    s.context = req.body
    s.status = 'active'
    return { data: s }
  })
  
  app.get('/:id/candidates', async (req: any) => {
    const s = db.sessions.get(req.params.id)
    if (!s) return { error: 'NOT_FOUND' }
    const c = await getRest(s.mode === 'individual' ? 1 : 5, [])
    s.candidates = c
    return { data: c }
  })
  
  app.post('/:id/reroll', async (req: any) => {
    const s = db.sessions.get(req.params.id)
    if (!s) return { error: 'NOT_FOUND' }
    const rc = (s as any).rerollCount || 0
    ;(s as any).rerollCount = rc + 1
    
    if (rc >= 2 && s.houseMode === 'strict') {
      s.status = 'completed'
      s.houseOverride = true
      return { data: { takeover: true, restaurant: s.candidates?.[0] } }
    }
    
    const c = await getRest(1, s.candidates?.map((x: any) => x.id) || [])
    s.candidates = c
    return { data: c }
  })
}