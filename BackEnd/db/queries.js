const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const Blob = require('buffer').Blob
const Sqids = require('sqids/cjs').default
const sqids = new Sqids({
    minLength: 10
})


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

async function createCommittee(name, topic, conference, userID) {
    try {
        const committee = await prisma.committee.create({
            data: {
                name: name,
                topic: topic,
                conference: conference,
                code: name
            }
        })

        const committeeID = committee.id;

        await prisma.committee.update({
            where: {
                id: committeeID
            },
            data: {
                code: sqids.encode([committeeID])
            }
        })

        const profile = await prisma.profile.create({
            data: {
                userId: userID,
                committeeId: committeeID,
                role: "admin" 
            }
        })

        const user = await prisma.user.update({
            where: { id: userID },
            data: {
                committees: {
                    connect: { id: committeeID }
                }
            }
        });

        return { committee: committee, profile: profile, user: user };

    } catch (error) {
        console.log(error);
        return "Error creating committee or profile";
    }
}


module.exports = {signUp, login, getCommittees, createCommittee}