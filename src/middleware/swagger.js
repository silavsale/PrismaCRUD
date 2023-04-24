const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const path = require('path')

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description: 'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server',
    },
  ],
}

const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: [path.join(__dirname, '../routes/*.js')],
}


const swaggerSpec = swaggerJSDoc(options)

// const swaggerSpec = swaggerJsdoc(swaggerOptions)

module.exports = {
  swaggerUi,
  swaggerSpec,
}
