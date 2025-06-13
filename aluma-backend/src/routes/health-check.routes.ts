import { Router } from 'express'

const router = Router()

router.get('/', () => {
  return {
    message: 'OK',
    status: 200,
  }
})

export default router
