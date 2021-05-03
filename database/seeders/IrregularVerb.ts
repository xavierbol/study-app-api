import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import IrregularVerb from 'App/Models/IrregularVerb'
import CSVToJSON from 'csvtojson';

export default class IrregularVerbSeeder extends BaseSeeder {
  public async run() {
    try {
      const verbs = await CSVToJSON().fromFile('irregular_verbs.csv');
      await IrregularVerb.createMany(verbs);
    } catch (error) {
      console.error(error);
    }
  }
}
