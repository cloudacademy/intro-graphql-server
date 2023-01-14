import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type User {
    id: Int!
    name: String!
    age: Int
    isManager: Boolean!
  }
  
  type Query {
    user(id: Int!): User
    users(age: Int): [User]
    managers: [User]
  }

  type Mutation {
    createUser(id: Int!, age: Int!, name: String!, isManager: Boolean!): User
    updateUserAge(id: Int!, age: Int!): User
  }
`);

export default schema