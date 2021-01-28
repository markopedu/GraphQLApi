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
        console.log('ERROR: ', error);

        if(error.extensions.code == 'INTERNAL_SERVER_ERROR'){
            return new ApolloError('We are having some trouble.', 'ERROR', { token: uuidv4() });
        }
        else if(error.extensions.code == 'GRAPHQL_VALIDATION_FAILED') {
            return new ValidationError(error.message);
        }

    })
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => {
    console.log(`graphQL running at ${url}`);
  });
