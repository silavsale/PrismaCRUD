const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.json(allUsers);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
      }
})

app.post('/', async (req, res) => {
    try {
        const newUser = await prisma.user.create({ data: req.body });
        res.json(newUser);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
      }
})

app.listen(3001, () => console.log(`Server running on port ${3001}`))