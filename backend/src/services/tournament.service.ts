import { prisma } from '../utils/prisma'
import { TournamentInput } from '../schemas/tournament.schema'

export async function createTournament(data: any) {
  return prisma.tournament.create({
    data: {
      name: data.name,
      location: data.location ?? null,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      createdBy: data.createdBy
    }
  })
}
