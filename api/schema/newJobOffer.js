import Joi from 'joi'

const newJobOffer = Joi.object({
  title: Joi.string().min(3).max(140).required(),
  slug: Joi.string(),
  description: Joi.string().required(),
  salary: Joi.string().required(),
  contractType: Joi.string().required(),
  location: Joi.string().required(),
})

export default newJobOffer
