import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Language from 'App/Models/Language';
import Vocabulary from 'App/Models/Vocabulary';
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator';
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator';

export default class CategoriesController {
  public async index({ response, params }: HttpContextContract) {
    try {
      const categories = await Category.query().withScopes((scopes) => scopes.language(params.lang));
      return response.ok(categories);
    } catch (err) {
      console.error(err);
      return response.internalServerError(err);
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const category = await Category.findOrFail(params.id);
      return response.ok(category);
    } catch (err) {
      console.error(err);
      return response.badRequest(err);
    }
  }

  public async getVocabularies({ response, params }: HttpContextContract) {
    try {
      const vocabularies = await Vocabulary
        .query()
        .where('category_id', '=', params.category_id)
        .orderBy('word');
      return response.ok(vocabularies);
    } catch (err) {
      console.error(err);
      return response.internalServerError(err);
    }
  }

  public async store({ request, response, params }: HttpContextContract) {
    try {
      const categoryData = await request.validate(CreateCategoryValidator);
      const category = await Category
        .query()
        .where('name', '=', categoryData.name)
        .withScopes((scope) => scope.language(params.lang))
        .first()

      if (category != null) {
        response.badRequest('Une catégorie existe déjà sous ce nom.');
      }
      const language = await Language.findByOrFail('slug', params.lang);
      const newCategory = await Category.create({ ...categoryData, languageId: language.id });
      return response.created(newCategory);
    } catch (err) {
      console.error(err);
      return response.badRequest(err);
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const categoryData = await request.validate(UpdateCategoryValidator);
      const category = await Category.findOrFail(params.id);

      category.name = categoryData.name || category.name;
      category.description = categoryData.description || category.description;
      await category.save();
    } catch (err) {
      console.error(err);
      return response.badRequest(err);
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const category = await Category.findOrFail(params.id);
      await category.delete();
      return response.noContent();
    } catch (err) {
      console.error(err);
      return response.badRequest(err);
    }
  }
}
