const modelUser = require("../model/user");

module.exports = {
    async parseAuthorizationToken(request, response, next) {
        const authHeader = request.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (!token) {
          return next();
        }

        const payload = await modelUser.verifyJWT(token);

        request.user = payload;

        // continue
        next();
    },

    requireUser(){
        return function(request, response, next) {
          if (!request.user) {
            return next({
              status: 401,
              message: 'You need to be logged in!'
            });
          }

          next();
        }
    }
}