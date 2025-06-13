import { Router } from 'express'
import { SimulationController } from '../controllers/simulation.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()
const simulationController = new SimulationController()

router.use(authMiddleware)

router.post('/', simulationController.create.bind(simulationController))
router.get('/', simulationController.list.bind(simulationController))

export default router
