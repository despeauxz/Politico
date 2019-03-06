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
   * Confirm and update candidate status
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof ElectionController
   */
  static async confirm(req, res) {
    try {
      const query = 'SELECT * FROM candidates WHERE id=$1';
      const response = await db.query(query, [req.params.id]);
      if (!response.rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Candidate does not exist',
        });
      }
      const updateQuery = 'UPDATE candidates SET confirm=$1 WHERE id=$2 returning *';
      const result = await db.query(updateQuery, [true, req.params.id]);
      return res.status(200).json({
        status: 200,
        message: 'Candidate has been confirmed',
        data: result.rows[0],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  /**
   * Get all confirmed candidates per office
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof ElectionController
   */
  static async getConfirmedCandidates(req, res) {
    try {
      const officeQuery = 'SELECT * FROM offices WHERE id=$1';
      const response = await db.query(officeQuery, [req.params.id]);
      if (!response.rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Office does not exist',
        });
      }
      const query = `SELECT candidates.id, candidates.confirm, users.firstname as firstname,
        users.lastname as lastname, parties.name as partyname FROM candidates 
        LEFT JOIN users ON users.id = candidates.user_id 
        LEFT JOIN parties ON parties.id = candidates.party_id 
        WHERE candidates.office_id=$1 AND candidates.confirm=true`;
      const { rows, rowCount } = await db.query(query, [req.params.id]);
      return res.status(200).json({
        status: 200,
        data: rows,
        rowCount,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }

  static async getAllCandidates(req, res) {
    try {
      const query = `SELECT candidates.id, candidates.confirm, users.firstname as firstname,
        users.lastname as lastname, parties.name as partyname, offices.name as officename FROM candidates 
        LEFT JOIN users ON users.id = candidates.user_id 
        LEFT JOIN parties ON parties.id = candidates.party_id
        LEFT JOIN offices ON offices.id = candidates.office_id
        ORDER BY candidates.office_id ASC`;
      const { rows, rowCount } = await db.query(query);
      return res.status(200).json({
        status: 200,
        data: rows,
        rowCount,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
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
