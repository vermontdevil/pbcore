import { z } from 'zod'

export const TournamentSchema = z.object({
  name: z.string().min(1, 'Tournament name is required'),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
})

export type TournamentInput = z.infer<typeof TournamentSchema>
