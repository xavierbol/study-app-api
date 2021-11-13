import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VocabularyValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    word: schema.string({ trim: true }),
    translation: schema.string({ trim: true }),
    category_id: schema.number([
      rules.exists({ table: 'categories', column: 'id' })
    ]),
  })

  public messages = {
    'word.required': 'Le mot de vocabulaire est requis.',
    'translation.required': 'La traduction du mot de vocabulaire est requis.',
    'category_id.required': 'La catégorie est requise pour classer correctement le mot de vocabulaire.',
  }
}
