import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = Router()

/**
 * Get all the languages
 * Path : /api/language
 */
router.get('/', async (req, res) => {
  let languages = await prisma.languages.findMany()

  res.json(languages)
})

export default router
