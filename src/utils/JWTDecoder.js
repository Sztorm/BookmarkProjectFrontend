const JWTDecoder = {
    getHeader: jwt => JSON.parse(window.atob(jwt.split('.')[0])),
    getPayload: jwt => JSON.parse(window.atob(jwt.split('.')[1]))
}
export default JWTDecoder
