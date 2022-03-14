const express = require('express');
const bcrypt = require('bcrypt');

app = express();

app.use(express.json());

const users = [];
app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users/login', async (req, res) => {

    try {

        let user = users.find(user => user.name == req.body.name);
        if (user) {

            let isAuthentic = await bcrypt.compare(req.body.password, user.password);
            if (isAuthentic) {
                console.log("Authentication successful");
                res.status(200).send(`${user.name} has sucessfully logged in`);
            } else {
                console.log("Authentication failed");
                res.status(404).send("Wrong credentials");
            }

        } else {
            return res.status(400).send("User not found");
        }

    } catch (e) {
        console.log(e.message);
        res.status(500).send(e.message);
    }

})

app.post('/users', async (req, res) => {
    // console.log(req.body);

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        console.log(salt);
        console.log(hashedPassword);

        const user = {
            name: req.body.name,
            password: hashedPassword
        }
        users.push(user);
        res.status(201).send();
        // res.json(users);
    } catch (e) {
        console.log(e.message);
    }

})

app.listen(3000);