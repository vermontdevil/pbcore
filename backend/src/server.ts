import './types/fastify'
import app from './app'

const PORT = Number(process.env.PORT) || 4000

app.listen({ port: PORT }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`pbcore is running on ${address}`)
})
