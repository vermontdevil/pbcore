import { FastifyRequest, FastifyReply } from 'fastify'
import { supabaseClient } from '../config/supabase'

export async function verifyAuth(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization
  
  if (!authHeader) {
    return reply.status(401).send({ error: 'Missing authorization header' })
  }

  const token = authHeader.replace('Bearer ', '')
  
  try {
    const { data, error } = await supabaseClient.auth.getUser(token)
    
    if (error || !data.user) {
      return reply.status(401).send({ error: 'Invalid token' })
    }
    
    request.user = data.user
  } catch (err) {
    return reply.status(401).send({ error: 'Token verification failed' })
  }
}
