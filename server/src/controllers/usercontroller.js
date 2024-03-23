const express = require("express");
const { getAllUsers, searchUser, getById, createUser, updateUser, getUserFriends, getInvitedEvents } = require("../model/user");
const { requireUser } = require('../middleware/authorization');
const { register } = require("module");

const router = express.Router();

router.get('/', (request, response, next) => {

    //TODO: remove, this is a security flaw
    response.send(getAllUsers());
})
.get('/friends/:id', (request, response, next) => {
    const user = getById(+request.params.id);

    const friends = getUserFriends(user.id);

    response.send(friends);
})
.get('/search', (request, response, next) => {
    const searchedResults = searchUser(request.query.q);

    response.send(searchedResults);
}) 
.get('/:id', (request, response, next) => {
    const user = getById(+request.params.id);

    response.send(user);
})
.get('/:id/invitedto', (request, response, next) => {
    const user = getById(+request.params.id);

    const events = getInvitedEvents(user.id)

    response.send(events);
})
.post('/', (request, response, next) => {
    const user = createUser(request.body);

    response.send(user);
})
.post('/register', (request, response, next) => {
    const user = register(request.body);

    response.send(user);
})
.post('/login', (request, response, next) => {
    loginUser(request.body.email, request.body.password)
    .then(user => {
        response.send(user);
    }).catch(next);
})
.patch('/:id', (request, response, next) => {
    const loggedInUserId = request.user.id;
    const targettedUser = +request.params.id;

    if (loggedInUserId !== targettedUser) {
        return next({
            status: 403,
            message: "Forbidden API usage."
        });
    }

    request.body.id = targettedUser;

    const user = updateUser(request.body);

    response.send(user);
})
.delete('/:id', (request, response, next) => {
    const loggedInUserId = request.user.id;
    const targettedUser = +request.params.id;

    if (loggedInUserId !== targettedUser) {
        return next({
            status: 403,
            message: "Forbidden API usage."
        });
    }

    remove(targettedUser);
    
    response.send({message: "User was removed."});
})

module.exports = router;