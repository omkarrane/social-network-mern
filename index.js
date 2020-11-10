const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URI } = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const middlwares = require('./middlewares');
const { applyMiddleware } = require('graphql-middleware');

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  context: async ({ req, res }) => ({ req, res }),
  schema: applyMiddleware(schema, ...middlwares)
});

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("database connected successfully");
    return server.listen({ port: 4000 });
  })
  .then(res => {
    console.log(`server running at ${res.url}`);
  });