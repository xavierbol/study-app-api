import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IrregularVerbValidator {
  constructor (protected ctx: HttpContextContract) { }

  public schema = schema.create({
    infinitive: schema.string({trim: true}),
    pastSimple: schema.string({trim: true}),
    pastSimple2: schema.string.optional({trim: true}),
    pastParticiple: schema.string({trim: true}),
    translation: schema.string({trim: true}),
  })

  public messages = {
    'infinite.required': "Le verbe a l'infinitif est requis.",
    'pastSimple.required': "Le verbe au passé simple est requis.",
    'pastParticiple.required': "Le verbe au participe passé est requis.",
    'translation.required': "La traduction en français du verbe est requise.",
  }
}
