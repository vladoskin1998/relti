import { Router } from 'express'
import postRouter from './routes/postRouter.js'
import authRouter from './routes/authRouter.js'
import mailRouter from './routes/mailRouter.js'

const router = new Router()

router.use('/auth', authRouter)
router.use('/post', postRouter)
router.use('/mail', mailRouter)

export default router