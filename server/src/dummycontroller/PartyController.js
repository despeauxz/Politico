import uuid from 'uuid';
import models from '../models/Party';

/**
 * @exports
 * @class Partycontroller
 * @extends Controller
 */
class PartyController {
  /**
     * Creates a new party
     * @method create
     * @memberof Partycontroller
     * @param {object} req
     * @param {object} res
     * @returns {(function|object)} Function next() or JSON object
     */
  static async create(req, res) {
    const party = await models.create(req.body);
    return res.status(201).json({
      status: res.statusCode,
      message: 'Party added successfully',
      data: party,
    });
  }

  static async getAll(req, res) {
    const parties = await models.findAll();
    return res.status(200).json({
      status: res.statusCode,
      data: parties,
    });
  }

  static async getParty(req, res) {
    const party = models.findOne(req.params.id);
    if (!party) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'party not found',
      });
    }
    return res.status(200).json({
      status: res.statusCode,
      data: party,
    });
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof PartyController
   */
  static async update(req, res) {
    const party = models.findOne(req.params.id);
    if (!party) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'party not found',
      });
    }

    const updatedParty = models.update(req.params.id, req.body);
    return res.status(200).json({
      status: res.statusCode,
      data: updatedParty,
    });
  }

  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof PartyController
   */
  static async delete(req, res) {
    const party = models.findOne(req.params.id);

    if (!party) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Party not found',
      });
    }

    const deleteParty = models.delete(req.params.id);
    return res.status(200).json({
      status: res.statusCode,
      message: 'Party successfully deleted',
    });
  }
}

export default PartyController;
