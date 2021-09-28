import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Languages extends BaseSchema {
  protected tableName = 'languages'
  irregularVerbTable = "irregular_verbs"

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('slug', 5).notNullable();
      table.string('name').notNullable();
    })
    this.schema.alterTable(this.irregularVerbTable, (table) => {
      table.integer('language_id')
      table.foreign('language_id').references('id').inTable(this.tableName)
    })
  }

  public async down () {
    this.schema.alterTable(this.irregularVerbTable, (table) => {
      table.dropForeign('language_id')
      table.dropColumn('language_id')
    })
    this.schema.dropTable(this.tableName);
  }
}
