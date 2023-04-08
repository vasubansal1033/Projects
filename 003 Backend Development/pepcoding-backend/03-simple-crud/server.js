const express = require('express');
const app = express();

const PORT = 3000;

let users = [];
users.push({"id": 1, "name": "Vasu"});
users.push({"id": 2, "name": "Parv"});
users.push({"id": 3, "name": "Bonda"});

app.use(express.json());

app.get('/user/:id', (req, res) => {
    // const id = req.body.id;
    const id = req.params.id;

    const user = users.find(u => u.id == id);

    if(user) {
        return res.json({
            success: true,
            message: `User with id ${id} found`,
            data: user
        })
    }

    res.json({
        success: false,
        message: `User with id ${id} not found`,
        data: NaN
    })
})

app.get('/user_by_id_age', (req, res) => {
    const query_obj = req.query;
    const user = users.find(u => u['id'] == query_obj['id'] && u['name'] == query_obj['name'])

    let success = true;
    let message = "";
    if(!user) {
        success = false;
        message = `User not found`;
    } else {
        message = `User found`;
    }

    res.json({
        "success": success,
        "message": message,
        "user": user
    })
})

app.post('/user', (req, res) => {
    const user = req.body;

    const u = users.find(u => u.id == user.id)
    if(u) {
        return res.json({
            "success": false,
            "message": `User with id ${user['id']} already exists`
        })
    }

    user['id'] = req.body['id'];
    if(!user['id']) {
        user['id'] = users.length + 1;;
    }
    
    users.push(user);

    res.json({
        "success": true,
        "message": `User with id ${user['id']} added`,
    })
})

app.patch('/user', (req, res) => {
    const body = req.body;
    const id = body.id;

    const u = users.find(user => user.id == id);
    if(!u) {
        return res.json({
            "success": false,
            "message": `User with id ${id} does not exist`
        })
    }

    for(let key in body) {
        u[key] = body[key];
    }

    res.json({
        "success": true,
        "message": `User with id ${id} updated successfully`
    })

})

app.delete('/user', (req, res) => {
    const id = req.body.id;

    const u = users.find(user => user.id == id);
    if(!u) {
        return res.json({
            "success": false,
            "message": `User with id ${id} does not exist`
        })
    }

    users = users.filter(user => user.id != id);
    res.json({
        "success": true,
        "message": `User with id ${id} deleted successfully`
    })
})

app.listen(PORT)