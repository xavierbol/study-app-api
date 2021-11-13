import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string({ trim: true }),
    description: schema.string.optional({ trim: true }),
  })

  public messages = {
    'name.required': 'Le nom de la catégorie est requis.',
  }
}
