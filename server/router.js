import { Router } from 'express'
import PostRouter from './routes/postRouter.js'
import AuthRouter from './routes/authRouter.js'
import MailRouter from './routes/mailRouter.js'
import GeoRouter from './routes/geoRouter.js'

const router = new Router()

router.use('/auth', AuthRouter)
router.use('/post', PostRouter)
router.use('/mail', MailRouter)
router.use('/geo', GeoRouter)

export default router