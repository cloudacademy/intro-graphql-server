import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { getUser, getUsers, getManagers, updateUserAge, createUser } from './src/resolvers.js';
import schema from './src/schema.js';

// The root provides a resolver function for each API endpoint
const root = {
  user: getUser,
  users: getUsers,
  managers: getManagers,
  updateUserAge: updateUserAge,
  createUser: createUser,
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');