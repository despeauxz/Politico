import models from '../models/office';

/**
 * @exports
 * @class OfficeController
 */
class OfficeController {
  /**
     * Creates a new office
     * @method create
     * @memberof Officecontroller
     * @param {object} req
     * @param {object} res
     * @returns {(function|object)} Function next() or JSON object
     */
  static async create(req, res) {
    try {
      const { rows } = await models.create(req.body);
      return res.status(201).json({
        status: res.statusCode,
        message: 'Office added successfully',
        data: rows[0],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          status: res.statusCode,
          message: 'Office already exists',
        });
      }
      return res.status(404).json({
        status: res.statusCode,
        error,
      });
    }
  }

  /**
     * Get all offices
     * @static
     * @param {*} req
     * @param {*} res
     * @returns { Array } Returns an arra of Objects
     * @memberof OfficeController
     */
  static async getOffices(req, res) {
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

  static async getOfficeByID(req, res) {
    try {
      const { rows } = await models.findOne(req.params.id);
      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          message: 'Office Not Found',
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
}

export default OfficeController;
