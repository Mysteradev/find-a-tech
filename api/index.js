import express from 'express'

const app = express()

app.use(express.json())

/**
 * logic for our api will go here
 */
export default {
  path: '/api',
  handler: app,
}
