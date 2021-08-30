import Joi from 'joi';

const newJobSeekerSchema = Joi.object({
  email: Joi.string()
    .email(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
  firstName: Joi.string()
    .min(2)
    .max(35)
    .required()
    .trim(),
  lastName: Joi.string()
    .min(2)
    .max(35)
    .required()
    .trim(),
  age: Joi.number()
    .min(16)
    .max(80)
    .required(),
  city: Joi.string()
    .required()
})

export default newJobSeekerSchema
