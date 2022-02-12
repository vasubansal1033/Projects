const express = require('express');

const app = express();

//middleware function -> used in post requests, frontend->json
app.use(express.json());

let user = {};
app.get('/user', (req, res)=>{
    res.send(user);
})

app.post('/user', (req, res)=>{
    console.log(req.body);
    user = req.body
    res.json({
        message: "data received successfully",
        user: req.body
    })
})

// update data
// don't use nodemon, as server gets restarted everytime this clearing out user array
app.patch('/user', (req, res)=>{
    console.log('req.body->', req.body);

    for(key in req.body){
        user[key] = req.body[key];
    }

    res.json({
        message:"data updated successfully"
    })
})

// to delete data
app.delete('/user', (req, res)=>{
    user = {};
    res.json({
        message: "data has been deleted"
    })
})

app.listen(3000);