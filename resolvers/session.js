const _ = require('lodash');
const {ApolloError} = require('apollo-server');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async speakers(session, args, {dataSources}) {
        try {
            const speakers = await dataSources.speakerAPI.getSpeakers();
            const returns = speakers.filter((speaker) => {
                return _.filter(session.speakers, { id: speaker.id }).length > 0;
            });

            return returns;
        } catch (e) {
            return new ApolloError('Unable to get speakers', 'SPEAKER_API_ERROR', { token: uuidv4() });
        }

    }
};
