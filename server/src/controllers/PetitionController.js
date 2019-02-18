import models from '../models/petition';

class PetitionController {

  /**
     * @static
     * @param {*} req
     * @param {*} res
     * @memberof PetitionController
     */
  static async create(req, res) {
    try {
      const { rows } = await models.create(req, req.body);
      return res.status(201).json({
        status: res.statusCode,
        message: 'Petition sent successfully',
        data: rows[0],
      });
    } catch (error) {
      if (error.routine === 'ri_ReportViolation') {
        return res.status(404).json({
          status: 404,
          error: 'Office does not exist',
        });
      }
      return res.status(404).json({
        status: res.statusCode,
        error,
      });
    }
  }
}

export default PetitionController;
