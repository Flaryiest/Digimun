const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function signUp(email, password) {
    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                password: password
            }
    })
        console.log(user)
        return user
    
    } catch(err) {
        console.log(err)
        return "An account associated with this email already exists"
    }

}

async function login(email) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        return user

} catch(err) {
    return "There is no account associated with this email"
}
}

module.exports = {signUp, login}