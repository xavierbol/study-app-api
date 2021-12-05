import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category';
import Vocabulary from 'App/Models/Vocabulary'
import CreateVocabularyValidator from 'App/Validators/CreateVocabularyValidator';
import UpdateVocabularyValidator from 'App/Validators/UpdateVocabularyValidator';

export default class VocabulariesController {
  public async index({ response, params }: HttpContextContract) {
    try {
      const words = await Vocabulary
        .query()
        .withScopes((scopes) => scopes.language(params.lang))
        .orderBy('word')
      return response.ok(words)
    } catch (err) {
      console.error(err);
      return response.internalServerError(err);
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const vocabulary = await Vocabulary.findOrFail(params.id);
      return response.ok(vocabulary);
    } catch (err) {
      console.error(err);
      return response.badRequest(err);
    }
  }

  public async store({ request, response, params }: HttpContextContract) {
    try {
      const vocabularyData = await request.validate(CreateVocabularyValidator);
      const category = await Category
        .query()
        .where('id', '=', vocabularyData.category_id)
        .withScopes(scope => scope.language(params.lang))
        .firstOrFail()
      const vocabulary = await Vocabulary
        .query()
        .where('word', '=', vocabularyData.word)
        .andWhere('translation', '=', vocabularyData.translation)
        .andWhere('categoryId', '=', category.id)
        .first();

      if (vocabulary != null) {
        response.badRequest('Ce mot de vocabulaire et sa traduction existe déjà.');
      }
      const newVocabulary = await Vocabulary.create(vocabularyData);
      return response.created(newVocabulary);
    } catch (err) {
      console.error(err);
      return response.badRequest(err);
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const vocabularyData = await request.validate(UpdateVocabularyValidator);
      const vocabulary = await Vocabulary.findOrFail(params.id);

      vocabulary.word = vocabularyData.word || vocabulary.word;
      vocabulary.translation = vocabularyData.translation || vocabulary.translation;

      await vocabulary.save();
      return response.noContent();
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
