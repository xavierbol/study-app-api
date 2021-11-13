import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateVocabularyValidator {
  constructor (protected ctx: HttpContextContract) { }

  public schema = schema.create({
    word: schema.string.optional({ trim: true }),
    translation: schema.string.optional({ trim: true }),
    category_id: schema.number.optional([
      rules.exists({ table: 'categories', column: 'id' })
    ]),
  })

  public messages = { }
}
