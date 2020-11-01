const { gql } = require('apollo-server');

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

module.exports = typeDefs;