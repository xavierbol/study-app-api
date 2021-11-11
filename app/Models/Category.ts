import { BaseModel, BelongsTo, belongsTo, column, ModelQueryBuilderContract, scope } from '@ioc:Adonis/Lucid/Orm'
import Language from './Language';

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public languageId: number;

  @belongsTo(() => Language)
  public language: BelongsTo<typeof Language>

  public static language = scope((query: ModelQueryBuilderContract<typeof Category>, languageSlug: string) => {
    query.whereHas('language', (query) => {
      query.where('slug', '=', languageSlug)
    })
  })
}
