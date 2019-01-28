import uuidv4 from 'uuid/v4';
import moment from 'moment';
import partyDB from '../../data/party';

/**
 * @exports
 * @class Partycontroller
 * @extends Controller
 */
class Partycontroller {
  /**
     * Creates a new party
     * @method create
     * @memberof Partycontroller
     * @param {object} req
     * @param {object} res
     * @returns {(function|object)} Function next() or JSON object
     */
  static create(req, res) {
    const data = { ...req.body };

    partyDB.push(data);
    const party = Partycontroller.getPartyObject(data);

    return res.status(201).json({
      status: res.statusCode,
      data: party,
    });
  }

  static getPartyObject(party) {
    const {
      name, fullname, hqAddress, logoUrl,
    } = party;

    return {
      id: uuidv4(),
      name,
      fullname,
      hqAddress,
      logoUrl,
      createdAt: moment().format('YYYY-MM-DD h:m:s'),
      updatedAt: moment().format('YYYY-MM-DD h:m:s'),
    };
  }
}

export default Partycontroller;
