class ErrorsApi extends Error {

    constructor(message, status = 400) {
        super(message)
        this.status = status
    }

    static badRequest(message, status = 400) {
        return new ErrorsApi(message, status)
    }

    static unAuthorization() {
        return new ErrorsApi("Not authorization", 401)
    }
}

export default ErrorsApi