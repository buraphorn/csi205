

const uesrs = [
    {
        user: 'user',
        pass: 'pass',
        role:'admin',
        token: '123'
    }
]
export function verifyUser() {
    const userFound = uesrs.find((u) => {
        return u.user === 'user' && u.pass === 'pass'
    })
    return userFound ? { role: userFound.role, token: userFound.token } : null
}