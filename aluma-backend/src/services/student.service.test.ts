import { describe, it, expect, vi, beforeEach } from 'vitest'
import { StudentService } from './student.service'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

vi.mock('@prisma/client')
vi.mock('bcrypt')
vi.mock('jsonwebtoken')

describe('StudentService', () => {
  let studentService: StudentService
  let mockPrisma: any

  beforeEach(() => {
    mockPrisma = {
      student: {
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
      },
    }
    ;(PrismaClient as any).mockImplementation(() => mockPrisma)
    studentService = new StudentService()
  })

  describe('register', () => {
    it('should register a new student successfully', async () => {
      const studentData = {
        name: 'John',
        surname: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      }

      mockPrisma.student.findUnique.mockResolvedValue(null)
      ;(bcrypt.hash as any).mockResolvedValue('hashed_password')
      mockPrisma.student.create.mockResolvedValue({
        id: 1,
        ...studentData,
        password: 'hashed_password',
      })
      ;(jwt.sign as any).mockReturnValue('jwt_token')

      const result = await studentService.register(studentData)

      expect(result).toEqual({
        student: {
          id: 1,
          name: 'John',
          surname: 'Doe',
          email: 'john@example.com',
        },
        token: 'jwt_token',
      })
    })

    it('should throw error if email already exists', async () => {
      const studentData = {
        name: 'John',
        surname: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      }

      mockPrisma.student.findUnique.mockResolvedValue({ id: 1, ...studentData })

      await expect(studentService.register(studentData)).rejects.toThrow('Email já cadastrado')
    })
  })

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const loginData = {
        email: 'john@example.com',
        password: 'password123',
      }

      const student = {
        id: 1,
        name: 'John',
        surname: 'Doe',
        email: 'john@example.com',
        password: 'hashed_password',
      }

      mockPrisma.student.findUnique.mockResolvedValue(student)
      ;(bcrypt.compare as any).mockResolvedValue(true)
      ;(jwt.sign as any).mockReturnValue('jwt_token')

      const result = await studentService.login(loginData)

      expect(result).toEqual({
        student: {
          id: 1,
          name: 'John',
          surname: 'Doe',
          email: 'john@example.com',
        },
        token: 'jwt_token',
      })
    })

    it('should throw error with invalid credentials', async () => {
      const loginData = {
        email: 'john@example.com',
        password: 'wrong_password',
      }

      mockPrisma.student.findUnique.mockResolvedValue(null)

      await expect(studentService.login(loginData)).rejects.toThrow('Credenciais inválidas')
    })
  })
})
