const { ApolloServer, ApolloError, ValidationError } = require('apollo-server');
const { v4: uuidv4 } = require('uuid');

const SessionAPI = require('./datasources/sessions');
const SpeakerAPI = require('./datasources/speakers');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const dataSources = () => ({
    sessionAPI: new SessionAPI(),
    speakerAPI: new SpeakerAPI()
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    debug: false,
    formatError: (error => {

        switch (error.extensions.code) {
            case 'INTERNAL_SERVER_ERROR':
                return new ApolloError('We are having some trouble.', 'ERROR', { token: uuidv4() });
            case 'GRAPHQL_VALIDATION_FAILED':
                return new ValidationError(error.message);
            case 'SPEAKER_API_ERROR':
                return new ApolloError(error.message, error.extensions.code, { token: error.extensions.token });
            default:
                return error;
        }
    })
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => {
    console.log(`graphQL running at ${url}`);
  });
