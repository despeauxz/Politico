import moment from 'moment';
import uuidv4 from 'uuid/v4';
import officeData from '../../data/office';

let formatedDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');

/**
 * @exports
 * @class Party
 */
class Offices {
    /**
     * Creates an instance of Offices.
     * @memberof Offices
     * @param { object } data
     */
    constructor() {
        this.offices = [...officeData];
    }

    /**
     * @param {*} data
     * @memberof Offices
     * @returns { object } office object
     */
    create(data) {
        const newOffice = {
            id: uuidv4(),
            type: data.type,
            name: data.name,
            createdAt: formatedDate,
            updatedAt: formatedDate,
        }

        this.offices.push(newOffice);
        return newOffice;
    }

    /**
     * @returns
     * @memberof Offices
     * @returns { object } returns all offices
     */
    findAll() {
        return this.offices;
    }
}

export default new Offices();
