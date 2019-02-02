import uuid from 'uuid';
import models from '../models/Offices';

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
        const office = await models.create(req.body);
        return res.status(201).json({
            status: res.statusCode,
            message: 'Office successfully added',
            data: office,
        });
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
