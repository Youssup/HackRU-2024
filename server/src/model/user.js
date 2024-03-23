const data = require("../data/users.json");

// OBJECTS \\ 
const BaseUser = {
    firstName: "",
    secondName: "",
}

const HasId = {
    id: 0,
}

const User = {
    ...BaseUser,
    ...HasId,
}
// OBJECTS \\ 

function getAllUsers() {
    return data.users;
}

module.exports = {
    getAllUsers
}