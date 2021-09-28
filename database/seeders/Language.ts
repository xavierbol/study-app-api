import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Language from 'App/Models/Language'

export default class LanguageSeeder extends BaseSeeder {
  public async run () {
    await Language.createMany([{
      slug: 'nl',
      name: 'néerlandais',
    }, {
      slug: 'en',
      name: 'anglais',
    }])
  }
}
