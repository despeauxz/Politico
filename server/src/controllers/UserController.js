import { config } from 'dotenv';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import bcrypt from 'bcrypt';
import db from '../models';
import Mailer from '../utils/Mailer';
import hashPassword from '../helpers/hashPassword';
import Authorization from '../middlewares/Authorization';

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
          user: UserController.getUserobj(rows[0]),
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
        user: UserController.getUserobj(rows[0]),
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

  static async forgotPassword(req, res) {
    const { email } = req.body;
    const text = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(text, [email]);

    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'User could not be found, Please Signup instead',
      });
    }

    const token = Authorization.generateToken(user);

    await Mailer.forgotPasswordMail(token, email);

    return res.status(200).json({
      status: 200,
      message: 'A reset token has been sent to your email address',
    });
  }

  static getUserobj(data) {
    return {
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      othername: data.othername,
      email: data.email,
      digit: data.digit,
      avatar: data.avatar,
      is_admin: data.is_admin,
      created_at: data.created_at,
      modified_at: data.modified_at,
    };
  }
}

export default UserController;
