const sessions = require('../data/sessions.json');
const { DataSource } = require('apollo-datasource');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

class SessionAPI extends DataSource {

    constructor() {
        super();
    }

    initialize(config) {
    }

    getSessions(args) {
        return _.filter(sessions, args);
    }

    getSessionById(id) {
        try {
            const session = _.filter(sessions, { id: parseFloat(id) });
            return session[0];
        } catch (e) {
            return { code: 'SESSION_ERROR', message: e.message, token: uuidv4() };
        }
    }

    toggleFavoriteSession(id) {
        const session = _.filter(sessions, { id: parseFloat(id) });
        session[0].favorite = !session[0].favorite;
        return session[0];
    }

    addSession(session) {
        session.id = uuidv4();
        sessions.push(session);
        return session;
    }
}

module.exports = SessionAPI;
