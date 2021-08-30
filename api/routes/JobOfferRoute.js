import { json, Router } from 'express'
import { PrismaClient } from '@prisma/client'
import newJobOffer from '../schema/newJobOffer'

const prisma = new PrismaClient()
const router = Router()

router.post('/', async (req, res) => {
  const { title, slug, description, salary, contractType, location } = req.body
  let validation = newJobOffer.validate({ ...req.body })
  const { error } = validation

  if (error == null) {
    const result = await prisma.offer.create({
      data: {
        title,
        slug: 'un-slug',
        description,
        salary,
        contractType,
        location,
        enterprise: {
          connect: {
            id: 'cksyvbxy10000ulyw6jkaeu48',
          },
        },
      },
      include: {
        enterprise: true,
      },
    })
    res.json(result)
  } else {
    res.status(422).json({
      error: error.details[0].message,
    })
  }
})

router.get('/', async (req, res) => {
  const offers = await prisma.offer.findMany({
    include: {
      enterprise: true,
    },
  })
  res.json(offers)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const offer = await prisma.offer.findUnique({
    where: {
      id: String(id),
    },
    include: {
      enterprise: true,
    },
  })
  res.json(offer)
})

export default router
