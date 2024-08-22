const { PrismaClient, MotionType  } = require('@prisma/client')
const { profile } = require('console')
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

async function getPermissions(committeeID, userID) {
    try {
        const decodedCommitteeID = sqids.decode(committeeID)[0]
        const userProfile = await prisma.profile.findFirst({
            where: {
                committeeId: decodedCommitteeID,
                userId: userID
            }
    })
        return userProfile

    } catch(error) {
        console.log(error)
        return false
    }
}

async function getCommittee(committeeID) {
    try {
        const decodedCommitteeID = sqids.decode(committeeID)[0]
        const committeeInfo = await prisma.committee.findUnique({
            where: {
                id: decodedCommitteeID
            },
            include: {
                profiles: true,
                countries: true,
                Motion: true
            }
        })
        return committeeInfo

    } catch(error) {
        console.log(error)
        return false
    }
}

async function getCountries() {
    try {
        const countries = await prisma.country.findMany()
        return countries
    } catch(error) {
        console.log(error)
        return false
    }
}

async function addCountry(committeeID, country, countryCode) {
    try {
        const decodedCommitteeID = sqids.decode(committeeID)[0]
        await prisma.profile.create({
            data: {
                role: "user",
                country: country,
                countryCode: countryCode,
                committee: {
                    connect: {
                        id: decodedCommitteeID
                    }
                }
            }
        })
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}

async function removeCountry(profileID) {
    try {
        await prisma.profile.delete({
            where: {
                id: profileID
            }
        })
        return true

    } catch(error) {
        console.log(error)
        return false
    }
}

async function togglePresent(profileID, status) {
    try {
        await prisma.profile.update({
            where: {
                id: profileID
            },
            data: {
                present: status
            }
        })
        return true

    } catch(error) {
        console.log(error)
        return false
    }
}

async function toggleVoting(profileID, status) {
    try {
        await prisma.profile.update({
            where: {
                id: profileID
            },
            data: {
                voting: status
            }
        })
        return true

    } catch(error) {
        console.log(error)
        return false
    }
}

async function getMotionTypes() {
    try {
        const MotionTypes = Object.keys(MotionType)
        return MotionTypes
    } 
    catch(error) {
        console.log(error)
        return false
    }
}

async function createModMotion(committeeID, profileID, motionType, name, time, country, speakingTime) {
    try {
        const decodedCommitteeID = sqids.decode(committeeID)[0]
        const motion = await prisma.motion.create({
            data: {
               text: name,
               time: time,
               country: country,
               speakingTime, speakingTime,
               committeeId: decodedCommitteeID,
               profileId: profileID,
               motionType: motionType
            }
        })
        const motionID = motion.id

        await prisma.motion.update({
            where: {
                id: motionID
            },
            data: {
                code: sqids.encode([motionID])
            }
        })

        return true

    } catch(error) {
        console.log(error)
        return false
    }
}

async function createUnModMotion(committeeID, profileID, motionType, time, country) {
    try {
        const decodedCommitteeID = sqids.decode(committeeID)[0]
        const response = await prisma.motion.create({
            data: {
                time: time,
                committeeId: decodedCommitteeID,
                profileId: profileID,
                country: country,
                motionType: motionType
            }
        })
        return true
        
    } catch(error) {
        console.log(error)
        return false
    }
}

async function deleteMotion(motionID) {
    try {
        const response = await prisma.motion.delete({
            where: {
                id: motionID
            }
        })
        return true

    } catch(error) {
        console.log(error)
        return false
    }
}

module.exports = {signUp, login, getCommittees, createCommittee, getPermissions, getCommittee, getCountries, addCountry, removeCountry, togglePresent, toggleVoting, getMotionTypes, createModMotion, createUnModMotion, deleteMotion}