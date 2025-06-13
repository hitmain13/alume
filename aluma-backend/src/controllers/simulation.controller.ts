import { Request, Response } from 'express'
import { SimulationService } from '../services/simulation.service'

export class SimulationController {
  private simulationService: SimulationService

  constructor() {
    this.simulationService = new SimulationService()
  }

  async create(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: 'Não autorizado' })
      }

      const simulation = await this.simulationService.create(req.user.id, req.body)
      return res.status(201).json(simulation)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }

  async list(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: 'Não autorizado' })
      }

      const simulations = await this.simulationService.listByStudent(req.user.id)
      return res.status(200).json(simulations)
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }
}
