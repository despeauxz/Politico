import moment from 'moment';
import uuidv4 from 'uuid/v4';

/**
 * @exports
 * @class Party
 */
class Party {
    /**
     * Creates an instance of Party.
     * @memberof Party
     * @param { object } data
     */
    constructor() {
        this.parties = [];
    }

    /**
     * @param {*} data
     * @memberof Party
     * @returns { object } party object
     */
    create(data) {
        const newParty = {
            id: uuidv4(),
            name: data.name,
            fullname: data.fullname,
            hqAddress: data.hqAddress,
            logoUrl: data.logoUrl,
            createdAt: moment.now(),
            updatedAt: moment.now(),
        }

        this.parties.push(newParty);
        return newParty;
    }
}

export default new Party();