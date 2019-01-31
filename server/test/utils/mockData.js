import moment from 'moment';

const currentDay = moment().format('YYYY-MM-DD h:m:s');

export default {
    createParty: {
        createPartyDetails: {
            id: 'd9b308bc-e511-4e0e-bf2c-1a457b3829cf',
            name: 'APC',
            fullname: 'All Progressive Party',
            hqAddress: 'Abuja FCT, Nigeria',
            logoUrl: 'https://via.placeholder.com/30',
            createdAt: currentDay,
            updatedAt: currentDay,
        },
        invalidPartyDetails: {
            id: '45d4ef2e-a7c7-4030-8278-9872c0d44ff3',
            name: '',
            fullname: 'People Democracy Party',
            hqAddress: '',
            logoUrl: 'https://via.placeholder.com/30',
            createdAt: currentDay,
            updatedAt: currentDay,
        }
    },
    createOffice: {
        createOfficeDetails: {
            id: 'e048707e-58dd-4246-b09c-e7909f6de583',
            type: 'Federal',
            name: 'President',
            createdAt: '2019-01-31T22:35:04.957',
            updatedAt: '2019-01-31T22:35:04.957',
        },
        invalidOfficeDetails: {
            id: '17e28f6f-51bb-46af-8a50-42f2f2f8a2d5',
            type: 'Local',
            createdAt: '2019-01-31T22:35:04.957',
            updatedAt: '2019-01-31T22:35:04.957',
        },
    }
}