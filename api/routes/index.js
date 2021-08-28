import { Router } from 'express'
import UserRoute from './UserRoute'
import LanguageRoute from './LanguageRoute'

let router = Router()

router.use('/user', UserRoute)
router.use('/language', LanguageRoute)

export default router
