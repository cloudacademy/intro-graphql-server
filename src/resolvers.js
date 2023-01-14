import usersData from './data.js';

const getUser = function(args) { 
    const { id } = args;
    return usersData.filter(user => {
        return user.id == id;
    })[0];
}

const getUsers = function(args) {
    if (args.age) {
        const age = args.age;
        return usersData.filter(user => user.age === age);
    } else {
        return usersData;
    }
}

const getManagers = function() {
    return usersData.filter(user => user.isManager === true);
}

const updateUserAge = function(args) {
    const { id, age } = args;
    usersData.map(user => {
        if (user.id === id) {
            user.age = age;
            return user;
        }
    });
    return usersData.filter(user => user.id === id)[0];
}

const createUser = function(args) {
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

export {
    getUser,
    getUsers,
    getManagers,
    updateUserAge,
    createUser
};