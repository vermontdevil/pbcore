import { FastifyRequest, FastifyReply } from 'fastify'
import { supabaseServiceClient } from '../config/supabase'
import { prisma } from '../db/prisma'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  userType: z.enum(['PLAYER', 'TOURNAMENT_DIRECTOR']),
  firstName: z.string().min(1),
  lastName: z.string().min(1)
})

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = registerSchema.parse(request.body)
    const { email, password, userType, firstName, lastName } = body

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseServiceClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (authError || !authData.user) {
      return reply.status(400).send({ error: authError?.message || 'Failed to create user' })
    }

    // Create user record in database
    const user = await prisma.user.create({
      data: {
        id: authData.user.id,
        email,
        firstName,
        lastName,
        userType: userType as 'PLAYER' | 'TOURNAMENT_DIRECTOR'
      }
    })

    return reply.status(201).send({ 
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: error.issues })
    }
    return reply.status(500).send({ error: 'Internal server error' })
  }
}

export async function getCurrentUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    if (!request.user) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }

    const user = await prisma.user.findUnique({
      where: { id: request.user.id }
    })

    if (!user) {
      return reply.status(404).send({ error: 'User not found' })
    }

    return reply.send({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType
    })
  } catch (error) {
    return reply.status(500).send({ error: 'Internal server error' })
  }
}
