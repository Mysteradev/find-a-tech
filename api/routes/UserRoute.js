import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

const router = Router()

/**
 * Create a new Job Seeker
 * Path : /api/user/jobseeker
 */
router.post('/jobseeker', async (req, res) => {
  const { email, password, firstName, lastName, age, adress } = req.body

  //TODO add validation
  const user = await prisma.user.create({
    data: {
      email,
      password,
      jobSeeker: {
        create: {
          firstName,
          lastName,
          age,
          adress,
        },
      },
    },
  })

  res.json(user)
})

export default router
