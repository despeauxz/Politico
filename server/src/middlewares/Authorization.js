import jwt from 'jsonwebtoken';
import db from "../models/index";

/**
 * @exports
 * @class Authorization
 */
class Authorization {
  /**
     * @method getToken
     * @memberof Authorization
     * @param {object} req
     * @returns {string} token
     */
  static getToken(req) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken && bearerToken.replace('Bearer ', '');

    return token;
  }

  /**
     * @method generateToken
     * @memberof Authorization
     * @param {object} user
     * @returns {string} token
     * expires in 24 hours
     */
  static generateToken({ ...user }) {
    const token = jwt.sign({ user },
      process.env.SECRET, {
        expiresIn: 172800,
      });

    return token;
  }

  /**
     * Authorize user
     * @method authenticate
     * @memberof Authorization
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @returns {(function|object)} Function next() or JSON object
     */
  // eslint-disable-next-line consistent-return
  static async authenticate(req, res, next) {
    try {
      const token = Authorization.getToken(req);
      if (!token) {
        return res.status(401).json({
          error: 'Unauthorized user',
        });
      }
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.id]);
      console.log(decoded);
      if (!rows[0]) {
        return res.status(400).json({
          status: 400,

        });
      }
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 401,
          error: 'Token Expired',
        });
      }
    }
  }
}

export default Authorization;
