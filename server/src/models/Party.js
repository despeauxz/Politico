import moment from 'moment';
import uuidv4 from 'uuid/v4';
import partyData from '../../data/party';

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
        this.parties = [ ...partyData ];
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

    /**
     * @returns
     * @memberof Party
     * @returns { object } returns all parties
     */
    findAll() {
        return this.parties;
    }

    /**
     * @param {uuid} id
     * @returns { object } returns party details
     * @memberof Party
     */
    findOne(id) {
        return this.parties.find(party => party.id === id);
    }
}

export default new Party();
