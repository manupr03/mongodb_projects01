const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try
     {
        await user.save()
        res.status(201).send(user)
    }
    catch (e) 
    {
        res.status(400).send(e)

    }
})

app.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.status(201).send(users)

    }catch (e)
     {
        res.status(500).send()
    }

})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user)
        {
            return res.satatus(404).send()
        }
        res.send(user)

    }catch (e)
    {
        res.status(500).send()

    }

})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)

    }catch (e) 
    {
        res.status(404).send(e)

    }

   
})
// setup a task reading endpoints
app.get('/tasks', async (req,res) => {

    try{
        const task = await Task.find({})
        res.send(task)
    }catch(e)
    {
        res.status(404).send()
    }

})

// creating fetch point for fetching a task by its id

app.get('/tasks/:id',async (req,res) => {
    const _id = req.params.id


    try {
        const task = await Task.findById(_id)
        if (!task){
            return res.status(404).send()
        }

        res.send(task)

    }catch(e)
    {
        res.status(404).send()
    }
    
})
// setup new request in postman and test your work

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})