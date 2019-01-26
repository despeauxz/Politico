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

const partyInfo = [
    {
        name: 'PDP',
        fullname: 'People\'s Democracy Party',
        hq: 'Abuja, FCT, Nigeria'
    },
    {
        name: 'APC',
        fullname: 'All Progressive Party',
        hq: 'Abuja, FCT, Nigeria'
    },
    {
        name: 'LP',
        fullname: 'Labour Party',
        hq: 'Abuja, FCT, Nigeria'
    },
    {
        name: 'AC',
        fullname: 'Action Congress',
        hq: 'Abuja, FCT, Nigeria'
    }
];

const partiesData = partyInfo.map(party => 
    `<div class="cards">
        <h2 class="card_title">${party.name}</h2>
        <p class="card_body">${party.fullname}</p>
        <p class="card_body">${party.hq}</p>
        <div class="more">
            <span class="ion-android-more-horizontal"></span>
            <ul>
                <li><a href="#" data-modal="#edit">Edit</a></li>
                <li><a href="#" data-modal="#delete">Delete</a></li>
            </ul>
        </div>

        <div class="modal" id="edit">
            <div class="modal-container">
                <div class="modal_title text-center">
                    <h2>Edit Party</h2>
                </div>
                <div class="modal_body">
                    <form role="form" method="POST">
                        <div class="d-flex-col">
                            <div class="form-group">
                                <label for="" class="control-label"> Name </label>
                                <input type="text" name="name" class="form-control" value="PDP">
                            </div>
                            <div class="form-group">
                                <label for="" class="control-label"> HQ Address </label>
                                <input type="text" name="hq-addr" class="form-control" value="Abuja FCT, Nigeria">
                            </div>
                            <button class="btn btn-primary" type="submit">Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal" id="delete">
            <div class="modal-container">
                <div class="modal_title text-sm text-center">
                    <h2 class="text-sm">Are you sure you want delete this Party?</h2>
                </div>
                <div class="modal_body text-center">
                    <button class="btn btn-danger">Yes</button>
                    <button class="btn btn-primary">No</button>
                </div>
            </div>
        </div>
    </div>`    
);


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
$('#party').html(partiesData);