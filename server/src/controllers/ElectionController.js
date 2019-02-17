import db from '../models';

/**
 * @exports
 * @class ElectionController
 */
class ElectionController {

  static async candidates(req, res) {
    const userId = req.params.id;
    const { officeId, partyId } = req.body;
    const searchText = 'SELECT * FROM users WHERE id=$1';
    const { rows } = await db.query(searchText, [userId]);
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }
    const text = 'INSERT INTO candidates(office_id, party_id, user_id) VALUES ($1, $2, $3) RETURNING office_id, user_id, party_id';
    try {
      const { rows } = await db.query(text, [officeId, partyId, userId]);
      return res.status(201).json({
        status: 201,
        message: 'You\'ve successfuly registered',
        data: rows[0],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 409,
          message: 'You cannot run for multiple Offices',
        });
      }
      return res.status(404).json({
        status: 404,
        message: 'Office/Party ID not found',
      });
    }
  }

  /**
     * Gets the Election results
     * @static
     * @param {*} req
     * @param {*} res
     * @memberof ElectionController
     */
  static async getResults(req, res) {
    const query = 'SELECT COUNT(votes.candidate_id) AS total, candidates.office_id, candidates.id FROM votes JOIN candidates ON candidates.id=votes.candidate_id WHERE votes.candidate_id=candidates.id AND candidates.office_id=$1 GROUP BY candidates.id, candidates.user_id, candidates.office_id';

    try {
      const { rows } = await db.query(query, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Office not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{
          office: rows[0].office_id,
          candidate: rows[0].id,
          result: rows[0].total,
        }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Internal Server error',
      });
    }
  }
}

export default ElectionController;
