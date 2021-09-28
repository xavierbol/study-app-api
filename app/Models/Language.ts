import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'

export default class Language extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public slug: "nl" | "en"

  @column()
  public name: string

  @hasMany(() => Category)
  public categories: HasMany<typeof Category>
}
