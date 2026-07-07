import { FastifyRequest, FastifyReply } from 'fastify'
import { createTournament } from '../services/tournament.service'
import { z } from 'zod'

const createTournamentSchema = z.object({
  name: z.string().min(1),
  location: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional()
})

export async function createTournamentHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    if (!request.user) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }

    const body = createTournamentSchema.parse(request.body)

    const tournament = await createTournament({
      ...body,
      createdBy: request.user.id
    })

    return reply.status(201).send(tournament)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: error.issues })
    }
    request.log.error(error)
    return reply.status(500).send({ error: 'Failed to create tournament' })
  }
}

export async function getTournamentsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    if (!request.user) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }

    // Get tournaments created by this user
    const tournaments = await (await import('../db/prisma')).prisma.tournament.findMany({
      where: {
        createdBy: request.user.id
      }
    })

    return reply.send(tournaments)
  } catch (error) {
    request.log.error(error)
    return reply.status(500).send({ error: 'Failed to fetch tournaments' })
  }
}
