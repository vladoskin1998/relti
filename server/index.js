import express from 'express'
import { PORT, URL_DB } from './conf.js'
import mongoose from 'mongoose'
import authRouter from './auth/authRouter/authRouter.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './router.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/auth', authRouter)
app.use('/api', router)


async function main() {
    await mongoose.connect(URL_DB, { useUnifiedTopology: true, useNewUrlParser: true })
    try {
        app.listen(PORT, () => { console.log('SERVER WORK') })
    } catch (error) {
        console.log(error.message)
    }
}

main()