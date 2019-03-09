/* eslint-disable no-unused-vars */
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import Mailer from '../utils/Mailer';
import models from '../models/users';
import db from '../models/index';
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
    try {
      const { rows } = await models.create(req, req.body);
      const token = Authorization.generateToken(UserController.getTokenObj(rows[0]));
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
          error: 'Email already taken',
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
    const { rows } = await models.find(email);
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
    const token = Authorization.generateToken(UserController.getTokenObj(rows[0]));
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

  /**
   * Updates user details
   * @static
   * @param {*} req
   * @param {*} res
   * @returns { Object }
   * @memberof UserController
   */
  static async user(req, res) {
    try {
      const { rows } = await models.update(req, req.body);
      return res.status(200).json({
        status: 200,
        message: 'User details updated successfully',
        data: UserController.getUserobj(rows[0]),
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;
    const { rows } = await models.find(email);

    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'User could not be found, Please Signup instead',
      });
    }

    const token = Authorization.generateToken(rows[0].email);
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

  static getTokenObj(data) {
    return {
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      othername: data.othername,
      email: data.email,
      digit: data.digit,
      is_admin: data.is_admin,
      password: data.password,
    };
  }

  static async details(req, res) {
    try {
      const query = `SELECT(SELECT COUNT(*) FROM users) as users,
        (SELECT COUNT(*) FROM offices) as offices,
        (SELECT COUNT(*) FROM parties) as parties`;
      const { rows } = await db.query(query);
      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }
}

export default UserController;
