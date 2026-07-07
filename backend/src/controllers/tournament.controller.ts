import { FastifyRequest, FastifyReply } from 'fastify'
import { createTournament } from '../services/tournament.service'

export async function createTournamentHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const data = request.body as any

    const tournament = await createTournament(data)

    return reply.status(201).send(tournament)
  } catch (err) {
    request.log.error(err)
    return reply.status(500).send({ error: 'Failed to create tournament' })
  }
}
