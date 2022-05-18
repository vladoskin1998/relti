import express from 'express'
import { PORT, URL_DB } from './conf.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './router.js'
import ErrorsMiddleware from './midlleware-server/errorsMidlleware.js';
import path from 'path'
import fileUpload from 'express-fileupload'

const app = express()
const __dirname = path.resolve()

// console.log(process.env)

////////////////////////////////domen servera cors!

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(express.json())

app.use(fileUpload({}))
app.use('/images', express.static(__dirname + '/images'));
app.use(cookieParser())
app.use(cors({
     credentials: true, 
  //  origin: 'http://localhost:3000'
    origin: process.env.SERVER_ADDRESS_NAME 
    }))
app.use('/api', router)
app.use(ErrorsMiddleware);

app.use((req, res, next) => { 
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); 
});

async function main() {
    const DB = await mongoose.connect(URL_DB, { useUnifiedTopology: true, useNewUrlParser: true })
    try {
        app.listen(PORT, () => { console.log(`SERVER WORK ${PORT}`) })
    } catch (error) {
        DB.disconnect();
        console.log(error.message)
    }
}

main()


//SERVER_ADDRESS_NAME=http://localhost:5000/
//SERVER_ADDRESS_NAME=https://arcane-scrubland-00147.herokuapp.com/