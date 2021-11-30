import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IrregularVerb from 'App/Models/IrregularVerb'
import Language from 'App/Models/Language';
import CreateIrregularVerbValidator from 'App/Validators/CreateIrregularVerbValidator';
import UpdateIrregularVerbValidator from 'App/Validators/UpdateIrregularVerbValidator';

export default class IrregularVerbsController {
  public async index({ response, params }: HttpContextContract) {
    try {
      const verbs = await IrregularVerb.query().whereHas('language', (query) => {
        query.where('slug', '=', params.lang)
      }).orderBy('infinitive');
      return response.ok(verbs);
    } catch (err) {
      return response.internalServerError(err);
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const verb = await IrregularVerb.findOrFail(params.id);
      return response.ok(verb);
    } catch (err) {
      return response.badRequest(err);
    }
  }

  public async store({ request, response, params }: HttpContextContract) {
    try {
      const verbData = await request.validate(CreateIrregularVerbValidator);
      const verb = await IrregularVerb.findBy('infinitive', verbData.infinitive);

      if (verb != null) {
        return response.badRequest('Ce verbe a déjà été ajouté');
      }

      const convertVerb = ({past_simple2: past_simple_2, ...rest}) => ({past_simple_2, ...rest})
      const language = await Language.findByOrFail('slug', params.lang);
      const newVerb = await IrregularVerb.create({ ...convertVerb(verbData), languageId: language.id });
      return response.created(newVerb);
    } catch (err) {
      console.error(err);
      return response.badRequest(err);
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const verbData = await request.validate(UpdateIrregularVerbValidator);
      const verb = await IrregularVerb.findOrFail(params.id);

      verb.infinitive = verbData.infinitive || verb.infinitive;
      verb.pastSimple = verbData.past_simple || verb.pastSimple;
      verb.pastSimple2 = verbData.past_simple2 || verb.pastSimple2;
      verb.pastParticiple = verbData.past_participle || verb.pastParticiple;
      verb.translation = verbData.translation || verb.translation;
      await verb.save();

      return response.noContent();
    } catch (err) {
      console.error(err);
      return response.badRequest(err);
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const verb = await IrregularVerb.findOrFail(params.id);
      await verb.delete();
      return response.noContent();
    } catch (err) {
      console.error(err);
      return response.badRequest(err);
    }
  }
}
