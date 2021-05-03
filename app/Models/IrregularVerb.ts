import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { convertToLowerCase } from 'App/utils/stringHelpers';

export default class IrregularVerb extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({prepare: convertToLowerCase})
  public infinitive: string;

  @column({prepare: convertToLowerCase})
  public pastSimple: string;

  @column({prepare: convertToLowerCase})
  public pastSimple2?: string;

  @column({prepare: convertToLowerCase})
  public pastParticiple: string;

  @column({prepare: convertToLowerCase})
  public translation: string;
}
