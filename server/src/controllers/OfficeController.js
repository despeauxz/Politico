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

    static async getOffices(req, res) {
        const offices = await models.findAll();
        
        return res.status(200).json({
            status: res.statusCode,
            data: offices,
        });
    }

    static async getOfficeByID(req, res) {
        const office = models.findOne(req.params.id);
        if (!office) {
            return res.status(404).json({
                status: res.statusCode,
                error: 'Office not found',
            });
        }

        return res.status(200).json({
            status: res.statusCode,
            data: office,
        });
    }
}

export default OfficeController;
