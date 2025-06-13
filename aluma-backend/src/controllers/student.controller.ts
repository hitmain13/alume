import { Request, Response } from 'express'
import { StudentService } from '../services/student.service'

export class StudentController {
  private studentService: StudentService

  constructor() {
    this.studentService = new StudentService()
  }

  async register(req: Request, res: Response) {
    try {
      const result = await this.studentService.register(req.body)
      return res.status(201).json(result)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await this.studentService.login(req.body)
      return res.status(200).json(result)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: 'Não autorizado' })
      }

      const profile = await this.studentService.getProfile(req.user.id)
      return res.status(200).json(profile)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: 'Não autorizado' })
      }

      const profile = await this.studentService.updateProfile(req.user.id, req.body)
      return res.status(200).json(profile)
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Erro interno do servidor' })
    }
  }
}
