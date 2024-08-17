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

    }   
    catch(err) {
        return "There is no account associated with this email"
    }   
}

async function getCommittees(userID) {
    try {
        const userCommittees = await prisma.user.findUnique({
            where: {
                id: userID
            },
            include: {
                committees: true
            }
        })
        return userCommittees.committees

    } catch (error) {
        console.error("Error fetching user committees:", error);
        throw error
    }
}

async function createCommittee(name, topic, conference) {
    try {
        const committee = await prisma.committee.create({
            data: {
                name: name,
                topic: topic,
                conference: conference
            }
        })
        return committee

    } catch(error) {
        console.log(error)
        return "Duplicate Committee"
    }
}


module.exports = {signUp, login, getCommittees, createCommittee}