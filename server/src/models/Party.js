import moment from 'moment';
import uuidv4 from 'uuid/v4';
import partyData from '../../data/party';

let formatedDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');

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
            createdAt: formatedDate,
            updatedAt: null,
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
    /**
     * @param { uuid } id
     * @param { object } data
     * @memberof Party
     */
    update(id, data) {
        const party = this.findOne(id);
        const index = this.parties.indexOf(party);
        this.parties[index].name = data["name"] || party.name;
        this.parties[index].updatedAt = formatedDate;
        return this.parties[index];
    }
    /**
     * @param { uuid } id
     * @memberof Party
     */
    delete(id) {
        const party = this.findOne(id);
        const index = this.parties.indexOf(party);
        this.parties.splice(index, 1);

        return {};
    }
}

export default new Party();
