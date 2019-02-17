import models from '../models/party';

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
    try {
      const response = await models.create(req.body);
      return res.status(201).json({
        status: res.statusCode,
        message: 'Party added successfully',
        data: response.rows[0],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          status: res.statusCode,
          message: 'Party already exists',
        });
      }
      return res.status(404).json({
        status: res.statusCode,
        error,
      });
    }
  }

  static async getAll(req, res) {
    try {
      const { rows, rowCount } = await models.findAll();
      return res.status(200).json({
        status: res.statusCode,
        data: rows,
        rowCount,
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error,
      });
    }
  }

  static async getParty(req, res) {
    try {
      const { rows } = await models.findOne(req.params.id);
      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          message: 'Party Not Found',
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error,
      });
    }
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
    try {
      const { rows } = await models.findOne(req.params.id);
      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'Party Not Found',
        });
      }
      const response = await models.update(req.params.id, req.body);
      return res.status(200).json({
        status: 200,
        message: 'Party details updated successfully',
        data: response.rows[0],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(404).json({
          status: 404,
          message: 'Party already exists',
        });
      }
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof PartyController
   */
  static async delete(req, res) {
    try {
      const { rows } = await models.findOne(req.params.id);
      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'Party Not Found',
        });
      }
      await models.delete(req.params.id);
      return res.status(200).json({
        status: 200,
        message: 'Party deleted successfully',
      });
    } catch (error) {
      return res.status(404).json({
        status: res.statusCode,
        error,
      });
    }
  }
}

export default PartyController;
