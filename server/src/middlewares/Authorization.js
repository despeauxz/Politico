import jwt from 'jsonwebtoken';

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
      process.env.SECRET || 'malikgodwinonimisi', {
        expiresIn: 86400,
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
  static authenticate(req, res, next) {
    try {
      const token = Authorization.getToken(req);
      if (!token) {
        return res.status(401).json({
          error: 'Unauthorized user',
        });
      }
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userData = decoded;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          error: 'Token Expired',
        });
      }
    }
  }
}

export default Authorization;
