import { Router } from 'express'
import postRouter from './posts/postRouter/postRouter.js'
import authRouter from './auth/authRouter/authRouter.js'

const router = new Router()

router.use('/auth', authRouter)
router.use('/post', postRouter)

export default router