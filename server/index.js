import express from 'express'
import { PORT, URL_DB } from './conf.js'
import mongoose from 'mongoose'
import authRouter from './auth/authRouter/authRouter.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './router.js'
import ErrorsMidlleware from './midllewareServer/errorsMidlleware.js';
import path from 'path'
import fileUpload from 'express-fileupload'

const app = express()
const __dirname = path.resolve()

////////////////////////////////domen servera cors!

app.use(express.json())
app.use(fileUpload({}))
app.use('/images', express.static(__dirname + '/images'));
app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use('/api', router)
app.use(ErrorsMidlleware);

async function main() {
    const DB = await mongoose.connect(URL_DB, { useUnifiedTopology: true, useNewUrlParser: true })
    try {
        app.listen(PORT, () => { console.log('SERVER WORK') })
    } catch (error) {
        DB.disconnect();
        console.log(error.message)
    }
}

main()