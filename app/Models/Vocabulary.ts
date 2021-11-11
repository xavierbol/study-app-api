import { BaseModel, BelongsTo, belongsTo, column, ModelQueryBuilderContract, scope } from '@ioc:Adonis/Lucid/Orm'
import { convertToLowerCase } from 'App/utils/stringHelpers'
import Category from './Category';

export default class Vocabulary extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({prepare: convertToLowerCase})
  public word: string;

  @column({prepare: convertToLowerCase})
  public translation: string;

  @column()
  public categoryId: number;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  public static language = scope((query: ModelQueryBuilderContract<typeof Vocabulary>, languageSlug: string) => {
    query.whereHas('category', (query) => {
      query.withScopes((scope) => scope.language(languageSlug))
    })
  })

}
