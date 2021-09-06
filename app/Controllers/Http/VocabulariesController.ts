import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vocabulary from 'App/Models/Vocabulary'
import VocabularyValidator from 'App/Validators/VocabularyValidator';

export default class VocabulariesController {
  public async index({ response }: HttpContextContract) {
    try {
      const words = await Vocabulary.all();
      return response.ok(
        words.sort(() => Math.random() - 0.5)
      )
    } catch (err) {
      console.error(err);
      return response.internalServerError(err);
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const vocabularyData = await request.validate(VocabularyValidator);
      const vocabulary = await Vocabulary.query().where('word', '=', vocabularyData.word).andWhere('translation', '=', vocabularyData.translation).first();

      if (vocabulary != null) {
        response.badRequest('Ce mot de vocabulaire et sa traduction existe déjà.');
      }
      const newVocabulary = await Vocabulary.create(vocabularyData);
      return response.created(newVocabulary);
    } catch(err) {
      console.error(err);
      return response.badRequest(err);
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const vocabularyData = await request.validate(VocabularyValidator);
      const vocabulary = await Vocabulary.findOrFail(params.id);

      vocabulary.word = vocabularyData.word || vocabulary.word;
      vocabulary.translation = vocabularyData.translation || vocabulary.translation;
      await vocabulary.save();
    } catch (err) {
      console.error(err);
      return response.badRequest(err);
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const vocabulary = await Vocabulary.findOrFail(params.id);
      await vocabulary.delete();
      return response.noContent();
    } catch (err) {
      console.error(err);
      return response.badRequest(err);
    }
  }
}
