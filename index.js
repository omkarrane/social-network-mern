const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URI } = require('./config');
const Post = require('./models/Post');

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!  # TODO: Change this to Date type
  }

  type Query {
    getPosts: [Post]
  }
`

const resolvers = {
  Query: {
    getPosts: async () => {
      const posts = await Post.find();
      return posts;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("database connected successfully");
    return server.listen({ port: 4000 });
  })
  .then(res => {
    console.log(`server running at ${res.url}`);
  });