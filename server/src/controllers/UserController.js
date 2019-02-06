import { config } from 'dotenv';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import hashPassword from '../helpers/hashPassword';
import Authorization from '../middlewares/Authorization';
import db from '../models';

config();

const { SALT_ROUNDS } = process.env;

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
}

export default UserController;
