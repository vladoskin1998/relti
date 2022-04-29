import { Router } from 'express'
import postRouter from './posts/postRouter/postRouter.js'
import authRouter from './auth/authRouter/authRouter.js'
import mailRouter from './mail/mailRouter/mailRouter.js'

const router = new Router()

router.use('/auth', authRouter)
router.use('/post', postRouter)
router.use('/mail', mailRouter)

export default router