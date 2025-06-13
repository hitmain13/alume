import { Student } from '@/types'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'
const TOKEN_EXPIRATION_BUFFER = 5 * 60 * 1000

export function getToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return null

  try {
    if (isTokenExpired(token)) {
      removeToken()
      return null
    }
    return token
  } catch {
    removeToken()
    return null
  }
}

export function setToken(token: string): void {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Token inválido')
    }

    const payload = JSON.parse(atob(parts[1]))
    if (!payload.exp) {
      throw new Error('Token sem data de expiração')
    }

    localStorage.setItem(TOKEN_KEY, token)
  } catch (error) {
    console.error('Erro ao armazenar token:', error)
    throw new Error('Token inválido')
  }
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function getStoredUser(): Student | null {
  const stored = localStorage.getItem(USER_KEY)
  if (!stored) return null

  try {
    const user = JSON.parse(stored)
    if (!user.id || !user.email) {
      throw new Error('Dados do usuário inválidos')
    }
    return user
  } catch {
    removeStoredUser()
    return null
  }
}

export function setStoredUser(user: Student): void {
  try {
    if (!user.id || !user.email) {
      throw new Error('Dados do usuário inválidos')
    }
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch (error) {
    console.error('Erro ao armazenar dados do usuário:', error)
    throw new Error('Dados do usuário inválidos')
  }
}

export function removeStoredUser(): void {
  localStorage.removeItem(USER_KEY)
}

export function clearAuthData(): void {
  removeToken()
  removeStoredUser()
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

export function isTokenExpiringSoon(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const expirationTime = payload.exp * 1000
    const currentTime = Date.now()
    return expirationTime - currentTime < TOKEN_EXPIRATION_BUFFER
  } catch {
    return true
  }
}

export function isAuthenticated(): boolean {
  const token = getToken()
  return !!token && !isTokenExpired(token)
}

export function getAuthHeaders(): Record<string, string> {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function getTokenExpirationTime(): number | null {
  const token = getToken()
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000
  } catch {
    return null
  }
}
