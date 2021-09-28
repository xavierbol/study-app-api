import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import IrregularVerb from 'App/Models/IrregularVerb'
import Language from 'App/Models/Language';
import CSVToJSON from 'csvtojson';

export default class IrregularVerbSeeder extends BaseSeeder {
  public async run() {
    try {
      const nl = await Language.findBy('slug', 'nl');
      if (nl) {
        const verbs = await CSVToJSON().fromFile('irregular_verbs.csv');
        await IrregularVerb.createMany(verbs.map(verb => {
          verb.languageId = nl.id;
          return verb;
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }
}
