import ErrorsApi from '../errorsServer/errorsApi.js'

export default function ErrorsMidlleware(err, req, res, next) {

    if (err instanceof ErrorsApi) {
        return res.status(err.status).json({ message: err.message })
    }
    console.log(err.message)
    return res.status(500).json("Problem of server")
}

