import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'
import Language from 'App/Models/Language'

export default class CategorySeeder extends BaseSeeder {
  public async run() {
    const nl = await Language.findBy('slug', 'nl') as Language;
    const en = await Language.findBy('slug', 'en') as Language;
    const defaultCategories: Array<Partial<Category>> = [{
      name: 'Noms',
    }, {
      name: 'Verbes',
    }]
    await Category.createMany([
      ...defaultCategories.map(cat => ({ ...cat, languageId: nl.id })),
      ...defaultCategories.map(cat => ({ ...cat, languageId: en.id })),
      {
        name: 'Idioms',
        languageId: en.id,
      }, {
        name: 'Phrasal Verbs',
        languageId: en.id,
      },
    ])
  }
}
