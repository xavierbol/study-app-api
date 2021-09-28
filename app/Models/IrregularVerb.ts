import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { convertToLowerCase } from 'App/utils/stringHelpers';
import Language from './Language';

export default class IrregularVerb extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ prepare: convertToLowerCase })
  public infinitive: string;

  @column({ prepare: convertToLowerCase })
  public pastSimple: string;

  @column({ prepare: convertToLowerCase, columnName: 'past_simple_2' })
  public pastSimple2?: string;

  @column({ prepare: convertToLowerCase })
  public pastParticiple: string;

  @column({ prepare: convertToLowerCase })
  public translation: string;

  @column()
  public languageId: number;

  @belongsTo(() => Language)
  public language: BelongsTo<typeof Language>
}
