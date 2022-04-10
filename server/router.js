import { Router } from 'express'
import postRouter from './posts/postRouter/postRouter.js'

const router = new Router()

router.use('/post', postRouter)

export default router