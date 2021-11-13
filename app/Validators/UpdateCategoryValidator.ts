import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCategoryValidator {
  constructor (protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
    description: schema.string.optional({ trim: true }),
  })

  public messages = { }
}
