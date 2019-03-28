import moment from 'moment';

const currentDay = moment().format('YYYY-MM-DD h:m:s');

export default {
  createParty: {
    createPartyDetails: {
      name: 'PDP',
      hq_address: 'Abuja FCT, Nigeria',
      logo_url: 'https://via.placeholder.com/30',
      created_at: currentDay,
      updatedAt: null,
    },
    invalidPartyDetails: {
      name: '',
      hq_address: 'Abuja, Nigeria',
      logo_url: 'https://via.placeholder.com/30',
      created_at: currentDay,
      updated_at: null,
    },
  },
  createOffice: {
    createOfficeDetails: {
      type: 'Federal',
      name: 'President',
      createdAt: '2019-01-31T22:35:04.957',
      updatedAt: null,
    },
    invalidOfficeDetails: {
      type: 'Local',
      createdAt: '2019-01-31T22:35:04.957',
      updatedAt: null,
    },
  },

  signup: {
    validUserDetails: {
      firstname: 'John',
      lastname: 'Doe',
      othername: 'Berry',
      email: 'example@gmail.com',
      digit: 123456789,
      password: 'password',
      passwordConfirm: 'password',
    },
    adminUserDetails: {
      firstname: 'John',
      lastname: 'Doe',
      othername: 'Berry',
      email: 'admin@email.com',
      digit: 123456789,
      password: 'password',
      passwordConfirm: 'password',
    },
    invalidUserDetails: {
      firstname: '',
      lastname: 'Jane',
      othername: 'Doe',
      email: 'example@gmail.com',
      digit: 2378909,
      password: 'password',
      passwordConfirm: 'pass',
    },
  },
  login: {
    nominalUserDetails: {
      email: 'example@gmail.com',
      password: 'password',
    },
    adminUserDetails: {
      email: 'admin@email.com',
      password: 'password',
    },
    invalidUserDetails: {
      email: 'allen@gmail.com',
      password: 'malikberry',
    },
    emptyUserDetails: {
      email: 'knjnjbn',
      password: '',
    },
  },
  candidates: {
    validDetails: {
      officeId: 1,
      partyId: 2,
    },
    emptyDetails: {
      officeId: '',
      partyId: '',
    },
  },
  votes: {
    validDetails: {
      officeId: 1,
      candidateId: 1,
    },
    invalidDetails: {
      officeId: 20,
      candidateId: 20,
    },
  },
  petition: {
    validDetails: {
      office_id: 1,
      title: 'Gang related',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis tempora beatae sequi provident, earum velit quidem blanditiis deleniti, maiores sint odio pariatur voluptas praesentium necessitatibus?',
    },
    invalidDetails: {
      office_id: 12,
      title: 'Gang related',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis tempora beatae sequi provident, earum velit quidem blanditiis deleniti, maiores sint odio pariatur voluptas praesentium necessitatibus?',
    },
    emptyDetails: {
      office_id: 1,
      title: '',
      text: '',
    },
  },
};
