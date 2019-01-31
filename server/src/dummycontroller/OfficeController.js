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
}

export default OfficeController;
