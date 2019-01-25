const pollingResults = [
    {
        names: 'Atiku Abubakar',
        party: 'PDP',
        office: 'President',
        votes: '8,000,000'
    },
    {
        names: 'Muhammed Buhari',
        party: 'APC',
        office: 'President',
        votes: '8,000,000'
    },
    {
        names: 'Fele Durotoye',
        party: 'AGP',
        office: 'President',
        votes: '8,000,000'
    },
    {
        names: 'Atiku Abubakar',
        party: 'PDP',
        office: 'President',
        votes: '8,000,000'
    },
    {
        names: 'Atiku Abubakar',
        party: 'PDP',
        office: 'President',
        votes: '8,000,000'
    }
];


const bulkData = pollingResults.map(result =>
    `<tr>
        <td class="v-align-middle">
            <p>${result.names}</p>
        </td>
        <td class="v-align-middle">
            <p>${result.party}</p>
        </td>
        <td class="v-align-middle">
            <p>${result.office}</p>
        </td>
        <td class="v-align-middle">
            <p>${result.votes}</p>
        </td>
    </tr>`
);

$('#data').html(bulkData);