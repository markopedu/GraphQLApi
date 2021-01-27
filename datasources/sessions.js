const sessions = require('../data/sessions.json');
const { DataSource } = require('apollo-datasource');


class SessionAPI extends DataSource {

    constructor() {
        super();
    }

    initialize(config) {
    }

    getSessions() {
        return sessions;
    }

    getSessionById(id) {
       const session = sessions.filter(x => x.id === parseFloat(id));
       return session[0];
    }
}

module.exports = SessionAPI;
