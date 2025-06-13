import { Router } from 'express'
import { StudentController } from '../controllers/student.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()
const studentController = new StudentController()

router.post('/register', studentController.register.bind(studentController))
router.post('/login', studentController.login.bind(studentController))

router.use(authMiddleware)
router.get('/me', studentController.getProfile.bind(studentController))
router.put('/me', studentController.updateProfile.bind(studentController))

export default router
