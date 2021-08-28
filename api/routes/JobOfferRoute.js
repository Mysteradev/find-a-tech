import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import slugify from 'slugify'

const prisma = new PrismaClient()

const router = Router()

router.post('/', async (req, res) => {
  const result = await prisma.offer.create({
    data: {
      title: req.body.title,
      slug: slugify(req.body.title),
      description: req.body.description,
      salary: req.body.salary,
      contractType: req.body.contractType,
      location: req.body.location,
    },
  })
  res.json(result)
})

router.get('/', async (req, res) => {
  const offers = await prisma.offer.findMany()
  res.json(offers)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const offer = await prisma.offer.findUnique({
    where: {
      id: String(id),
    },
  })
  res.json(offer)
})

export default router
