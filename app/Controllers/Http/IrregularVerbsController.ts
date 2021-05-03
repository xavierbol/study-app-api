import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IrregularVerb from 'App/Models/IrregularVerb'
import IrregularVerbValidator from 'App/Validators/IrregularVerbValidator';

export default class IrregularVerbsController {
  public async index({ response }: HttpContextContract) {
    try {
      // const verbs = await IrregularVerb.all();
      const verbs = await IrregularVerb.query().limit(3);
      return response.ok(
        // shuffle the list, source: https://flaviocopes.com/how-to-shuffle-array-javascript/
        verbs.sort(() => Math.random() - 0.5)
      );
    } catch (err) {
      return response.internalServerError(err);
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const verbData = await request.validate(IrregularVerbValidator);
      const verb = await IrregularVerb.findBy('infinitive', verbData.infinitive);

      if (verb != null) {
        return response.badRequest('Ce verbe a déjà été ajouté');
      }

      const newVerb = await IrregularVerb.create(verbData);
      return response.created(newVerb);
    } catch (err) {
      console.error(err);
      return response.badRequest(err);
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const verbData = await request.validate(IrregularVerbValidator);
      const verb = await IrregularVerb.findOrFail(params.id);

      verb.infinitive = verbData.infinitive || verb.infinitive;
      verb.pastSimple = verbData.pastSimple || verb.pastSimple;
      verb.pastSimple2 = verbData.pastSimple2 || verb.pastSimple2;
      verb.pastParticiple = verbData.pastParticiple || verb.pastParticiple;
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
