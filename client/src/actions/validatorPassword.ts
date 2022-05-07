export const validPassword = (s:string) => {
    return /([a-z]\d)|(\d[a-z])/g.test(s) && s.length >= 8 ? true : false
}