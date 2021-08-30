import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import newJobSeekerSchema from '../schema/NewJobSeeker'

const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

const router = Router()

/**
 * Create a new Job Seeker
 * Path : /api/user/jobseeker
 */
router.post('/jobseeker', async (req, res) => {
  const { email, password, firstName, lastName, age, city } = req.body

  // Data validation
  let validationResult = newJobSeekerSchema.validate({ ...req.body });
  const { error } = validationResult;
  if (error == null) {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User and a Jobseeker and return both data
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        jobSeeker: {
          create: {
            firstName,
            lastName,
            age,
            city
          }
        },
      },
      include: {
        jobSeeker: true
      }
    })

    res.json(user)
  } else {
    res.status(422).json({
      error: error.details[0].message
    })
  }
})

export default router
