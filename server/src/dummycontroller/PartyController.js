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
    const party = models.create(req.body);
    return res.status(201).json({
      status: res.statusCode,
      message: 'Party added successfully',
      data: party,
    });
  }
}

export default PartyController;
