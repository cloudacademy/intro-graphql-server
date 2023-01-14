var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var usersData = [
    {
        id: 1,
        name: "John",
        age: 40,
        isManager: true
    },
    {
        id: 2,
        name: "Sarah",
        age: 29,
        isManager: false
    },
    {
        id: 3,
        name: "Max",
        age: 29,
        isManager: false
    }
]

var getUser = function(args) { 
    const { id } = args;
    return usersData.filter(user => {
        return user.id == id;
    })[0];
}

var getUsers = function(args) {
    if (args.age) {
        var age = args.age;
        return usersData.filter(user => user.age === age);
    } else {
        return usersData;
    }
}

var getManagers = function() {
    return usersData.filter(user => user.isManager === true);
}

var updateUserAge = function(args) {
    const { id, age } = args;
    usersData.map(user => {
        if (user.id === id) {
            user.age = age;
            return user;
        }
    });
    return usersData.filter(user => user.id === id)[0];
}

var createUser = function(args) {
    const { id, name, age, isManager } = args;
    usersData.map(user => {
        if (user.id === id) {
            throw new Error("User ID already exists");
        }
    });

    newUser =   {
        id: id,
        name: name,
        age: age,
        isManager: isManager
    },
    usersData.push(newUser)
    
    return usersData.filter(user => user.id === id)[0];
}

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
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

// The root provides a resolver function for each API endpoint
var root = {
  user: getUser,
  users: getUsers,
  managers: getManagers,
  updateUserAge: updateUserAge,
  createUser: createUser,
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');