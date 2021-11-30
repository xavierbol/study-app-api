import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IrregularVerbValidator {
  constructor (protected ctx: HttpContextContract) { }

  public schema = schema.create({
    infinitive: schema.string({trim: true}),
    past_simple: schema.string({trim: true}),
    past_simple2: schema.string.optional({trim: true}),
    past_participle: schema.string({trim: true}),
    translation: schema.string({trim: true}),
  })

  public messages = {
    'infinite.required': "Le verbe a l'infinitif est requis.",
    'past_simple.required': "Le verbe au passé simple au singulier est requis.",
    'past_simple2.required': "Le verbe au passé simple au pluriel est requis.",
    'past_participle.required': "Le verbe au participe passé est requis.",
    'translation.required': "La traduction en français du verbe est requise.",
  }
}
