## Introduction to GraphQL Cloud Academy Lab

### Starting the server locally

1. Clone and `cd` into this repository, then run the following:

    ```
    npm install
    node server.js
    ```

1. Navigate to the `http://localhost:4000/graphql` in a browser window

### Queries

#### Get all Users

```
query getAllUsers($userAge: Int){
  users (age: $userAge){
    name
    id
    age
    isManager
  }
}
```

```
{
  "userAge": 29
}
```

#### Get a single User

```
query getSingleUser($userId: Int!){
  user (id: $userId){
    id
    name
    age
  }
}
```

```
{
  "id": 3
}
```

#### Update a User's age

```
mutation updateUserAge($id: Int!, $age: Int!) {
  updateUserAge(id: $id, age: $age) {
    id
    name
    age
  }
}
```

```
{
  "id": 2,
  "age": 30
}
```

#### Create a new User

```
mutation createUser($id: Int!, $name: String!, $age: Int!, $isManager: Boolean!) {
  createUser(id: $id, name: $name, age: $age, isManager: $isManager) {
    id
    name
    age
    isManager
  }
} 
```

```
{
  "id": 5,
  "age": 35,
  "name": "Ben",
  "isManager": false
}
```

#### Get all Users who are also managers

```
query getManagers{
  managers {
    id
    name
  }
}
```