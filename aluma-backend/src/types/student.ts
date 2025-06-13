export interface StudentRegisterInput {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface StudentLoginInput {
  email: string
  password: string
}

export interface StudentUpdateInput {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

export interface StudentResponse {
  id: number
  firstName: string
  lastName: string
  email: string
}
