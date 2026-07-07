import { FastifyInstance } from 'fastify'
import { createTournamentHandler, getTournamentsHandler } from '../controllers/tournament.controller'
import { verifyAuth } from '../middleware/auth'

async function tournamentRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    await verifyAuth(request, reply)
    if (!reply.sent) {
      return createTournamentHandler(request, reply)
    }
  })

  app.get('/', async (request, reply) => {
    await verifyAuth(request, reply)
    if (!reply.sent) {
      return getTournamentsHandler(request, reply)
    }
  })
}

export default tournamentRoutes
