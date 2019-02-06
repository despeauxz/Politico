import { config } from 'dotenv';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import bcrypt from 'bcrypt';
import hashPassword from '../helpers/hashPassword';
import Authorization from '../middlewares/Authorization';
import db from '../models';

config();

/**
 * Authentication
 * @class UserController
 */
class UserController {
  /**
   * Create a new User
   * @static
   * @param {*} req
   * @param {*} res
   * @returns { Object }
   * @memberof UserController
   */
  static async signup(req, res) {
    const {
      firstname, lastname, othername, email, digit, password, passwordCofirm,
    } = req.body;
    const newPassword = hashPassword(password, 10);
    const user = [
      uuidv4(), firstname, lastname, othername, email, digit, newPassword, moment(new Date()),
    ];

    const text = `INSERT INTO
      users(id, firstname, lastname, othername, email, digit, password, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
    const token = Authorization.generateToken(user);
    try {
      const { rows } = await db.query(text, user);
      return res.status(201).json({
        status: res.statusCode,
        message: 'User registered successfully',
        data: {
          token,
          user: rows[0],
        },
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          status: res.statusCode,
          message: 'Email already taken',
        });
      }
      return res.status(404).json({
        status: res.statusCode,
        error,
      });
    }
  }

  /**
   * Logs in a user
   * @method login
   * @memberof UserController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async login(req, res) {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    if (!rows[0]) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid Credentials',
      });
    }

    const isPasswordValid = await UserController.verifyPassword(password, rows[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid Credentials',
      });
    }
    const token = Authorization.generateToken(rows[0]);

    return res.status(200).json({
      status: 200,
      data: {
        token,
        user: rows[0],
      },
    });
  }


  /**
   * @method verifyPassword
   * @memberof UserController
   * @param {string} password
   * @param {string} hash
   * @return {Promise} Promise of true or false
   */
  static verifyPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

export default UserController;
