const express = require('express')
const app = express()
const { swaggerUi, swaggerSpec } = require('./middleware/swagger')
const indexPage = require('./routes/index')
const usersRouter = require('./routes/users')

app.use(express.json())


app.use('/', indexPage)
app.use('/users', usersRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(3001, () => console.log(`Server running on port ${3001}`))
