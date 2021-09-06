import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Vocabularies extends BaseSchema {
  protected tableName = 'vocabularies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('word').notNullable();
      table.string('translation').notNullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
