import Fastify from 'fastify'
import cors from '@fastify/cors'
import tournamentRoutes from './routes/tournament.routes'

const app = Fastify({
  logger: true
})

// CORS plugin
app.register(cors, {
  origin: '*'
})

// Register routes
app.register(tournamentRoutes, { prefix: '/tournaments' })

// Health check
app.get('/health', async () => {
  return 'OK'
})

export default app