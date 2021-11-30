import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateIrregularVerbValidator {
  constructor (protected ctx: HttpContextContract) { }

  public schema = schema.create({
    infinitive: schema.string.optional({trim: true}),
    past_simple: schema.string.optional({trim: true}),
    past_simple2: schema.string.optional({trim: true}),
    past_participle: schema.string.optional({trim: true}),
    translation: schema.string.optional({trim: true}),
  })

  public messages = { }
}
