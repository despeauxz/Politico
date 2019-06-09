import moment from 'moment';

const currentDay = moment().format('YYYY-MM-DD h:m:s');

export default {
  createParty: {
    createPartyDetails: {
      name: 'PDP',
      hqAddress: 'Abuja FCT, Nigeria',
      logoUrl: 'https://via.placeholder.com/30',
      fullname: 'People Democracy Party',
      created_at: currentDay,
      updatedAt: null,
    },
    invalidPartyDetails: {
      name: '',
      hqAddress: 'Abuja, Nigeria',
      logoUrl: 'https://via.placeholder.com/30',
      fullname: 'Unknown',
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
    secondOfficeDetails: {
      type: 'State',
      name: 'Governor',
      createdAt: '2019-01-31T22:35:04.957',
      updatedAt: null,
    },
    thirdOfficeDetails: {
      type: 'Local',
      name: 'Counsellor',
      createdAt: '2019-01-31T22:35:04.957',
      updatedAt: null,
    },
    invalidOfficeDetails: {
      type: 'Local',
      createdAt: '2019-01-31T22:35:04.957',
      updatedAt: null,
    },
  },
  updateOffice: {
    validOfficeDetails: {
      name: 'Minister',
      type: 'Federal',
      electionDate: '2019-06-09T00:00:00.957',
      createdAt: '2019-01-31T22:35:04.957',
      updatedAt: null,
    },
    duplicateOfficeDetails: {
      name: 'President',
      type: 'Federal',
      electionDate: '2019-06-09T00:00:00.957',
      createdAt: '2019-01-31T22:35:04.957',
      updatedAt: null,
    },
  },
  signup: {
    validUserDetails: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'example@gmail.com',
      password: 'password',
      passwordConfirm: 'password',
    },
    adminUserDetails: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'admin@email.com',
      password: 'password',
      passwordConfirm: 'password',
    },
    invalidUserDetails: {
      firstname: '',
      lastname: 'Jane',
      email: 'example@gmail.com',
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
      officeId: 1,
      title: 'Gang related',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis tempora beatae sequi provident, earum velit quidem blanditiis deleniti, maiores sint odio pariatur voluptas praesentium necessitatibus?',
    },
    invalidDetails: {
      officeId: 12,
      title: 'Gang related',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis tempora beatae sequi provident, earum velit quidem blanditiis deleniti, maiores sint odio pariatur voluptas praesentium necessitatibus?',
    },
    emptyDetails: {
      officeId: 1,
      title: '',
      text: '',
    },
  },
};
