import 'dotenv/config'
import express from 'express'
import studentRoutes from './routes/student.routes'
import simulationRoutes from './routes/simulation.routes'
import healthCheckRoutes from './routes/health-check.routes'
import { errorHandler } from './middlewares/errorHandler.middleware'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(express.json())

app.use('/api', studentRoutes)
app.use('/api/simulations', simulationRoutes)
app.use('/api/health-check', healthCheckRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
