export default interface AuthUser {
    id: string
    email: string
    isStaff: boolean
    iat: number
    exp: number
}
