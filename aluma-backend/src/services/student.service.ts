import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createStudentSchema, updateStudentSchema } from '../schemas/student.schema'
import { UnauthorizedError } from '../middlewares/errorHandler.middleware'
import { StudentLoginInput, StudentRegisterInput, StudentUpdateInput } from '../types/student'

const prisma = new PrismaClient()

export class StudentService {
  async register(data: StudentRegisterInput) {
    console.log('Tentativa de registro', data)
    try {
      const { firstName, lastName, email, password } = createStudentSchema.parse(data)

      const existingStudent = await prisma.student.findUnique({
        where: { email },
      })

      if (existingStudent) {
        throw new Error('Email já cadastrado')
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const student = await prisma.student.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      })

      const token = this.generateToken(student.id)

      return {
        student: {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
        },
        token,
      }
    } catch (error) {
      console.error('Erro no register:', error)
      throw error
    }
  }

  async login(data: StudentLoginInput) {
    console.log('Tentativa de login', data)
    try {
      const { email, password } = createStudentSchema
        .pick({ email: true, password: true })
        .parse(data)

      const student = await prisma.student.findUnique({
        where: { email },
      })

      if (!student) {
        throw new UnauthorizedError('Credenciais inválidas')
      }

      const isValidPassword = await bcrypt.compare(password, student.password)

      if (!isValidPassword) {
        throw new UnauthorizedError('Credenciais inválidas')
      }

      const token = this.generateToken(student.id)

      console.log('Sucesso no login!')

      return {
        student: {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
        },
        token,
      }
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  }

  async getProfile(studentId: number) {
    try {
      const student = await prisma.student.findUnique({
        where: { id: studentId },
      })

      if (!student) {
        throw new UnauthorizedError('Estudante não encontrado')
      }

      return {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
      }
    } catch (error) {
      console.error('Erro no getProfile:', error)
      throw error
    }
  }

  async updateProfile(studentId: number, data: StudentUpdateInput) {
    try {
      const { firstName, lastName, email, password } = updateStudentSchema.parse(data)

      const student = await prisma.student.findUnique({
        where: { id: studentId },
      })

      if (!student) {
        throw new UnauthorizedError('Estudante não encontrado')
      }

      if (email && email !== student.email) {
        const existingStudent = await prisma.student.findUnique({
          where: { email },
        })

        if (existingStudent) {
          throw new Error('Email já cadastrado')
        }
      }

      const updateData: Record<string, string> = {}
      if (firstName) updateData.firstName = firstName
      if (lastName) updateData.lastName = lastName
      if (email) updateData.email = email
      if (password) updateData.password = await bcrypt.hash(password, 10)

      const updatedStudent = await prisma.student.update({
        where: { id: studentId },
        data: updateData,
      })

      return {
        id: updatedStudent.id,
        firstName: updatedStudent.firstName,
        lastName: updatedStudent.lastName,
        email: updatedStudent.email,
      }
    } catch (error) {
      console.error('Erro no updateProfile:', error)
      throw error
    }
  }

  private generateToken(studentId: number) {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não configurado')
    }
    return jwt.sign({ id: studentId }, process.env.JWT_SECRET, {
      expiresIn: '5m',
    })
  }

  async getStudentById(id: number) {
    return prisma.student.findUnique({
      where: { id },
      select: { id: true, email: true, firstName: true, lastName: true },
    })
  }

  async updateStudent(id: number, data: StudentUpdateInput) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
    }
    return prisma.student.update({
      where: { id },
      data,
      select: { id: true, email: true, firstName: true, lastName: true },
    })
  }
}
