import { FastifyInstance } from 'fastify'
import { register, getCurrentUser } from '../controllers/auth.controller'
import { verifyAuth } from '../middleware/auth'

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', async (request, reply) => {
    return register(request, reply)
  })

  fastify.get('/me', async (request, reply) => {
    await verifyAuth(request, reply)
    if (!reply.sent) {
      return getCurrentUser(request, reply)
    }
  })
}
