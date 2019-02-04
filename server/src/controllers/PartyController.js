import uuidv4 from 'uuid/v4';
import moment from 'moment';
import db from '../models';

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
    const text = `INSERT INTO
      parties(id, name, hq_address, logo_url, created_at)
      VALUES ($1, $2, $3, $4, $5) returning *`;

    const values = [
      uuidv4(),
      req.body.name,
      req.body.hq_address,
      req.body.logo_url,
      moment(new Date()),
    ];
    
    try {
      const { rows } = await db.query(text, values);
      return res.status(201).json({
        status: res.statusCode,
        data: rows[0],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          status: res.statusCode,
          message: 'Party already exists',
        });
      }
      return res.status(400).json({
        status: res.statusCode,
        error,
      });
    }
  }

  static async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM parties';
    try {
      const { rows,rowCount } = await db.query(findAllQuery);
      return res.status(200).json({ 
        status: res.statusCode,
        data: rows,
        rowCount,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
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
