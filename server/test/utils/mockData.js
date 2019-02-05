import moment from 'moment';

const currentDay = moment().format('YYYY-MM-DD h:m:s');

export default {
    createParty: {
        createPartyDetails: {
            id: 1,
            name: 'PDP',
            hq_address: 'Abuja FCT, Nigeria',
            logo_url: 'https://via.placeholder.com/30',
            created_at: currentDay,
            updatedAt: null,
        },
        invalidPartyDetails: {
            id: 3,
            name: '',
            hq_address: 'Abuja, Nigeria',
            logo_url: 'https://via.placeholder.com/30',
            created_at: currentDay,
            updated_at: null,
        }
    },
    createOffice: {
        createOfficeDetails: {
            id: 1,
            type: 'Federal',
            name: 'President',
            createdAt: '2019-01-31T22:35:04.957',
            updatedAt: null,
        },
        invalidOfficeDetails: {
            id: 23,
            type: 'Local',
            createdAt: '2019-01-31T22:35:04.957',
            updatedAt: null,
        },
    }
}