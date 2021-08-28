import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

const router = Router()

/**
 * Create a new Job Seeker
 * Path : /api/user
 */
router.post('/', async (req, res) => {
  const { email, password, firstName, lastName, status, age, adress } = req.body

  const result = await prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastName,
      status,
      age,
      adress,
    },
  })
  res.json(result)
})

export default router
