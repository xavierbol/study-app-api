import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Categories extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('description');
      table.integer('language_id');
      table.foreign('language_id').references('id').inTable('languages');
    })

    this.schema.alterTable('vocabularies', (table) => {
      table.integer('category_id');
      table.foreign('category_id', 'fk_vocabulary_category').references('id').inTable(this.tableName);
    });
  }

  public async down() {
    this.schema.alterTable('vocabularies', (table) => {
      table.dropForeign('category_id');
      table.dropColumn('category_id');
    });
    this.schema.dropTable(this.tableName);
  }
}
