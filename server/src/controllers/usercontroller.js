const express = require("express");
const { getAllUsers, searchUser, getById, createUser, registerUser, updateUser, getUserFriends, getInvitedEvents, getUserEventById, createEvent, removeUser, deleteEvent, updateEvent, loginUser } = require("../model/user");
const { requireUser } = require('../middleware/authorization');

const router = express.Router();

router.get('/', (request, response, next) => {
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
.post('/', (request, response, next) => {
    const user = createUser(request.body);

    response.send(user);
})
.post('/register', (request, response, next) => {
    const user = registerUser(request.body);

    response.send(user);
})
.post('/login', (request, response, next) => {
    loginUser(request.body.email, request.body.password)
    .then(user => {
        response.send(user);
    }).catch(next);
})
.patch('/:id', requireUser(), (request, response, next) => {
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
.delete('/:id', requireUser(), (request, response, next) => {
    const loggedInUserId = request.user.id;
    const targettedUser = +request.params.id;

    if (loggedInUserId !== targettedUser) {
        return next({
            status: 403,
            message: "Forbidden API usage."
        });
    }

    removeUser(targettedUser);
    
    response.send({message: "User was removed."});
})
// events
.get('/:userid/:eventid', (request, response, next) => {
    const user = getById(+request.params.userid);

    const event = getUserEventById(user.id, +request.params.eventid);

    response.send(event);
})
.get('/:id/invitedto', (request, response, next) => {
    const user = getById(+request.params.id);

    const events = getInvitedEvents(user.id)

    response.send(events);
})
.post('/event', (request, response, next) => {
    const newEvent = createEvent(request.body)

    response.send(newEvent);
})
.delete('/event/:id', requireUser(), (request, response, next) => {
    if (!request.user) {
        return next({
            status: 403,
            message: "Forbidden API usage."
        });
    }

    const event = getUserEventById(+request.params.id);

    deleteEvent(request.user.id, event);

    response.send({message: "Event was removed."});
})
.patch('/event/:id', requireUser(), (request, response, next) => {
    if (!request.user) {
        return next({
            status: 403,
            message: "Forbidden API usage."
        });
    }

    const event = updateEvent(request.user.id, +request.params.id);

    response.send(event);
})

module.exports = router;