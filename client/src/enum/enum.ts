export enum OPTIONS {
    BUY = "BUY",
    RENT = "RENT",
}

export enum ROLE {
    ADMIN = "ADMIN",
    USER = "USER",
}

export enum SELECT {
    ASC = "asc",
    DESC = "desc",
    START = 1,
    END = -1
}   

export enum AUTH{
    LOGIN='Login',
    REGISTRATION='Registration',
    CHANGE_PASSWORD='Change password',
}

export enum ALERT{
    ERROR='error',
    SUCCESS='success',
    NONE='none'
}

export enum CURRENCY{
    UAH="UAH",
    EUR="EUR",
    USD="USD",
}

export enum ERRORAUTH{
    LOGIN="ERROR_LOG",
    PASSWORD="ERROR_PASS"
}