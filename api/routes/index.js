import { Router } from 'express'
import JobOfferRoute from './JobOfferRoute'

let router = Router()

router.use('/joboffer', JobOfferRoute)

export default router
