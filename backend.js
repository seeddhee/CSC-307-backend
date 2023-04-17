const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());
app.use(express.json());


const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}


app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;

    const updateduser = updateUserWithID(userToAdd)
    addUser(updateduser);
     res.status(201).send(updateduser).end();

});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);
    deleteUser(result);
    res.status(204).end();
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

function generateID(){
    return Math.floor(Math.random() * 10)}

function updateUserWithID(user){
   user['id'] = generateID();
    return user
}
    
function addUser(user){
users['users_list'].push(user);
}


function deleteUser(user){
    const index = users['users_list'].findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users['users_list'].splice(index, 1);
    }
  }

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});