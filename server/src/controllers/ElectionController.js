import db from '../models';

/**
 * @exports
 * @class ElectionController
 */
class ElectionController {
  static async candidates(req, res) {
    const userId = req.params.id;
    const { officeId, partyId } = req.body;
    const searchText = 'SELECT * FROM Users WHERE id=$1';
    const { rows } = await db.query(searchText, [userId]);
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }
    const text = 'INSERT INTO Candidates(officeId, partyId, userId) VALUES ($1, $2, $3) RETURNING officeId, userId, partyId';
    try {
      const response = await db.query(text, [officeId, partyId, userId]);
      return res.status(201).json({
        status: 201,
        message: 'You\'ve successfuly registered',
        data: response.rows[0],
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
      const query = 'SELECT * FROM Candidates WHERE id=$1';
      const response = await db.query(query, [req.params.id]);
      if (!response.rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Candidate does not exist',
        });
      }
      const updateQuery = 'UPDATE Candidates SET confirm=$1 WHERE id=$2 returning *';
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
      const officeQuery = 'SELECT * FROM Offices WHERE id=$1';
      const response = await db.query(officeQuery, [req.params.id]);
      if (!response.rows[0]) {
        return res.status(404).json({
          status: 404,
          message: 'Office does not exist',
        });
      }
      const query = `SELECT Candidates.id, Candidates.confirm, Users.firstname as firstname,
        Users.lastname as lastname, Parties.name as partyname FROM Candidates 
        LEFT JOIN Users ON Users.id = Candidates.userId 
        LEFT JOIN Parties ON Parties.id = Candidates.partyId 
        WHERE Candidates.officeId=$1 AND Candidates.confirm=true`;
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
      const query = `SELECT Candidates.id, Candidates.confirm, Users.firstname as firstname,
        Users.lastname as lastname, Parties.name as partyname, Offices.name as officename FROM Candidates 
        LEFT JOIN Users ON Users.id = Candidates.userId 
        LEFT JOIN Parties ON Parties.id = Candidates.partyId
        LEFT JOIN Offices ON Offices.id = Candidates.officeId
        ORDER BY Candidates.officeId ASC`;
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
    const query = 'SELECT COUNT(Votes.candidateId) AS total, Candidates.officeId, Candidates.id FROM Votes JOIN Candidates ON Candidates.id=Votes.candidateId WHERE Votes.candidateId=Candidates.id AND Candidates.officeId=$1 GROUP BY Candidates.id, Candidates.userId, Candidates.officeId';

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
          office: rows[0].officeId,
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
