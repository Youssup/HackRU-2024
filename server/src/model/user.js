const data = require("../data/users.json"); // data file

const jswonwebtoken = require('jsonwebtoken');
const dayjs = require('dayjs'); 

// JWT \\
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
// JWT \\

// OBJECTS \\ 
const BaseUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    friends: [],
    events: []
}

const HasId = {
    id: 0,
}

const User = {
    ...BaseUser,
    ...HasId,
}

// events objects below
const Coordinates = {
    latitude: 0,
    longitude: 0
}

const Address = {
    address: "",
    city: "", // optional property
    coordinates: Coordinates,
    postalCode: "",
    state: "",
}

const Event = {
    eventId: 0,
    eventName: "",
    eventColor: "",
    eventDescription: "",
    eventLocation: Address,
    eventStartDate: dayjs(),
    eventEndDate: dayjs(),
    eventStartTime: dayjs(),
    eventEndTime: dayjs(),
    eventIsAllDay: false,
    invited: []
}
// OBJECTS \\ 

// FUNCTIONS \\
function getAllUsers() {
    return data.users;
}

function searchUser(query) {
    return data.users.filter(x => {
        return (
             x.firstName.toLowerCase().includes(query.toLowerCase()) ||
             x.lastName.toLowerCase().includes(query.toLowerCase()) ||
             x.email.toLowerCase().includes(query.toLowerCase())
        );
    });
}

function getById(id) {
    const user = data.users.find(us => us.id === id);

    if (!user) {
        throw new Error("Cannot find that user!");
    }

    return user;
}

function getByEmail(email) {
    const user = data.users.find(us => us.email === email);

    if (!user) {
        throw new Error("Cannot find that user!");
    }

    return user;
}

function createUser(data) {
    const id = data.users.length + 1;

    const newUser = {
        id: id,
        ...data
    }

    data.users.push(newUser);

    return newUser;
}

// this function is used to create the user wtih validation
function registerUser(data) {
    if (data.password.length < 12) {
        throw new Error("Password must be 12 characters long!")
    }
    
    const userExists = getByEmail(data.email);

    if (userExists) {
        throw new Error("User already exists with this email!")
    }

    createUser(data);
}

async function loginUser(email, password) {
    const userExists = getByEmail(email);

    if (!userExists) {
        throw new Error("This user does not exist!");
    }

    if (userExists.password != password) {
        throw new Error("Incorrect login!");
    }

    const user = { ...userExists, password: undefined };
    const token = await generateJWT(user);

    return { user, token };
}

function updateUser(newData) {
    const userIndex = getById(newData.id);

    if (userIndex === -1) {
        throw new Error("Cannot find that user!");
    }
    
    data.users[userIndex] = {
        ...data.users[userIndex],
        ...newData,
    };

    return data.users[userIndex];
}

function removeUser(id) {
    const userIndex = getById(id);

    if (userIndex === -1) {
        throw new Error("Cannot find that user!");
    }

    data.users.splice(index, 1);
}

// events
function getUserEvents(id) {
    const user = getById(id);

    if (!user) {
        throw new Error("Cannot find that user!");
    }

    const userEvents = user.events ?? [];

    return userEvents;
}

function getInvitedEvents(id) {
    const user = getById(id);

    if (!user) {
        throw new Error("Cannot find that user!");
    }

    const friends = getUserFriends(id);
    const invitedEvents = [];

    friends.forEach(friend => {
        if (friend.events) { 
            friend.events.forEach(event => {
                if (!invitedEvents.some(invitedEvent => invitedEvent.eventId === event.eventId) && event.ownerId !== id) {
                    invitedEvents.push(event);
                }
            });
        }
    });

    return invitedEvents;
}

// friends
function getUserFriends(id) {
    const user = getById(id);

    if (!user) {
        throw new Error("Cannot find that user!");
    }

    const friendsIds = user?.friends ?? [];

    const friends = friendsIds.map(friendId => getById(friendId));

    return friends;
}

// FUNCTIONS \\

// JWT FUNCTIONS \\
function generateJWT(user) {
    return new Promise((resolve, reject) => {
        jswonwebtoken.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } , (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    })
}

function verifyJWT(token) {
    return new Promise((resolve, reject) => {
        jswonwebtoken.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        })
    })
}
// JWT FUNCTIONS \\

// Javascript exporting shiz
module.exports = {
    getAllUsers, getById, getByEmail, searchUser, createUser, registerUser, loginUser, updateUser, removeUser, generateJWT, verifyJWT,
    getUserFriends, getInvitedEvents
}