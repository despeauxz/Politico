import moment from 'moment';
import db from '../models';

/**
 * @exports
 * @class OfficeController
 * @extends Controller
 */
class OfficeController {
    /**
     * Creates a new office
     * @method create
     * @memberof Officecontroller
     * @param {object} req
     * @param {object} res
     * @returns {(function|object)} Function next() or JSON object
     */
    static async create(req, res) {
        const text = `INSERT INTO
      offices(name, type, created_at)
      VALUES ($1, $2, $3) returning *`;

        const values = [
            req.body.name,
            req.body.type,
            moment(new Date()),
        ];

        try {
            const { rows } = await db.query(text, values);
            return res.status(201).json({
                status: res.statusCode,
                message: 'Office added successfully',
                data: rows[0],
            });
        } catch (error) {
            if (error.routine === '_bt_check_unique') {
                return res.status(400).json({
                    status: res.statusCode,
                    message: 'Office already exists',
                });
            }
            return res.status(404).json({
                status: res.statusCode,
                error,
            });
        }
    }

    /**
     * Get all offices
     * @static
     * @param {*} req
     * @param {*} res
     * @returns { Array } Returns an arra of Objects
     * @memberof OfficeController
     */
    static async getOffices(req, res) {
        const findAllQuery = 'SELECT * FROM offices';
        try {
            const { rows, rowCount } = await db.query(findAllQuery);
            return res.status(200).json({
                status: res.statusCode,
                data: rows,
                rowCount,
            });
        } catch (error) {
            return res.status(400).json({
                status: res.statusCode,
                error,
            });
        }
    }

    static async getOfficeByID(req, res) {
        const text = 'SELECT * FROM offices WHERE id = $1';
        try {
            const { rows } = await db.query(text, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).json({
                    status: res.statusCode,
                    message: 'Office Not Found',
                });
            }
            return res.status(200).json({
                status: res.statusCode,
                data: rows[0],
            });
        } catch (error) {
            return res.status(400).json({
                status: res.statusCode,
                error,
            });
        }
    }
}

export default OfficeController;
