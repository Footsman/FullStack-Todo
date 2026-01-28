const express = require('express');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express()

app.use(express.json());

app.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany();
    res.json(todos)
});

app.post('/todo', async (req, res) => {
    const { title } = req.body;
    const todo = await prisma.todo.create({
        data: { title }
    })
    res.json(todo) ;
})

//update function
app.put('/todo/:id', async(req, res) => {
    const {id} = req.params;
    const { title } = req.body;
    res.json(`${id}, ${title}`)
})

app.delete('/todo/:id', async(req, res) => {
    const { id } = req.params;

    res.json(id)
})

app.listen(3000, () => {
    console.log('App running')
});