import { FastifyInstance } from 'fastify'
import { createTournamentHandler } from '../controllers/tournament.controller'

async function tournamentRoutes(app: FastifyInstance) {
  app.post('/', createTournamentHandler)
}

export default tournamentRoutes
