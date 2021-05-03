import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class IrregularVerbs extends BaseSchema {
  protected tableName = 'irregular_verbs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable();
      table.string('infinitive');
      table.string('past_simple').notNullable();
      table.string('past_simple_2').nullable();
      table.string('past_participle').notNullable();
      table.string('translation').notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
