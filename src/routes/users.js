const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

/**
 * @swagger
 * components:
 *   schemas:
 *     NewUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Leanne Graham
 *     User:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The user ID.
 *               example: 0
 *         - $ref: '#/components/schemas/NewUser'
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users from the database. Can be used to populate a list of users when prototyping or testing an API.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany()
    res.json(allUsers)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while fetching users.' })
  }
})

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user.
 *     description: Create a new user in the database.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: An error occurred while creating the user.
 */
router.post('/', async (req, res) => {
  try {
    const newUser = await prisma.user.create({ data: req.body })
    res.json(newUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while creating the user.' })
  }
})

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a JSONPlaceholder user's name.
 *     description: Update the name of a user from JSONPlaceholder by providing the user ID and new name.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name for the user.
 *                 example: Jane Doe
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: An error occurred while updating the user.
 */
router.put('/:id', async (req, res) => {
  const userId = parseInt(req.params.id)
  const { name } = req.body

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name: name },
    })

    res.json(updatedUser)
  } catch (error) {
    console.error(error)

    if (error.code === 'P2002') {
      res.status(409).json({ error: 'A user with the same name already exists.' })
    } else if (error.code === 'P2025') {
      res.status(409).json({ error: `User with this ID ${userId} not exists.` })
    } else {
      res.status(500).json({ error: 'An error occurred while updating the user.' })
    }
  }
})

module.exports = router
