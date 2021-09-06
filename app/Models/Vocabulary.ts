import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { convertToLowerCase } from 'App/utils/stringHelpers'

export default class Vocabulary extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({prepare: convertToLowerCase})
  public word: string;

  @column({prepare: convertToLowerCase})
  public translation: string;
}
