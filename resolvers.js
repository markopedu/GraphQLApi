const Query = require('./resolvers/query');
const Session = require('./resolvers/session');
const Mutation = require('./resolvers/mutation');
const Room = require('./resolvers/room');

module.exports = {
    Query,
    Session,
    Mutation,
    Room,
    SessionOrError: {
        __resolveType(obj) {
            if(obj.code) {
                return 'Error';
            }
            return 'Session';
        }
    }
};
