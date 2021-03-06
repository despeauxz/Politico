const alert = document.querySelector('.alert');
const officeContainer = document.getElementById('user-office');
const officeDetails = document.getElementById('office-details');
const url = 'https://cryptic-escarpment-28116.herokuapp.com/api/v1';
const options = {
    method: 'GET',
    headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
};

window.onload = () => {
    fetch(`${url}/offices`, options)
    .then(res => res.json())
    .then((response) => {
        if (!response.data.length) {
            officeContainer.innerHTML = '<p class="text-center text-md">No office at this moment</p>';
        } else {
            response.data.map((office) => {
                officeContainer.innerHTML += `
                    <div class="cards card-wrap">
                        <h2 class="card_title text-small text-center" style="text-transform: capitalize;font-size: 15px;">${office.name}</h2>
                        <p class="card_body">${office.type}</p>
                        <p class="card_body">Validity: </p>
                        <div class="more">
                            <span class="icon ion-ios-more"></span>
                            <ul>
                                <li><a href="#" data-modal="#vote-${office.id}">Vote</a></li>
                                <li><a href="#" data-modal="#aspire-${office.id}">Aspire</a></li>
                                <li><a href="#" data-modal="#petition-${office.id}">Petition</a></li>
                            </ul>
                        </div>

                        <div class="modal" id="vote-${office.id}">
                            <div class="modal-container">
                                <div class="modal_title text-center">
                                    <h2>Vote</h2>
                                </div>
                                <div class="modal_body">
                                    <form role="form" method="POST" id="vote" office-id="${office.id}">
                                        <div class="d-flex-col office text-center" id="voters" index="${office.id}">
                                            
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="modal" id="aspire-${office.id}">
                            <div class="modal-container">
                                <div class="modal_title text-sm text-center">
                                    <h2 class="text-sm">Are you sure you want to aspire for this office?</h2>
                                </div>
                                <div class="modal_body text-center">
                                    <button class="btn btn-danger" id="aspire-btn" index="${office.id}">Yes</button>
                                    <button class="btn btn-primary">No</button>
                                </div>
                            </div>
                        </div>
                        <div class="modal" id="petition-${office.id}">
                            <div class="modal-container">
                                <div class="modal_title text-center">
                                    <h2>Petition</h2>
                                </div>
                                <div class="modal_body">
                                    <form role="form" method="POST"  index="${office.id}" id="petition">
                                        <div class="errors form-group petition-error">
                                            <ul></ul>
                                        </div>
                                        <div class="d-flex-col">
                                            <div class="form-group">
                                                <label for="title" class="control-label">Title</label>
                                                <input type="text" style="text-transform: uppercase;" name="title" class="form-control" id="petition-title">
                                            </div>
                                            <div class="form-group">
                                                <label for="body" class="control-label">Reason?</label>
                                                <textarea name="body" class="form-control" rows="5" id="petition-body"></textarea>
                                            </div>
                                            <button class="btn btn-primary" type="submit" id="petition-btn">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            })
        }
        officeDetails.textContent = `Offices (${response.data.length})`;
    })
    .then(() => {
        createPetition();
        aspire();
        loadCandidates();
        voteCandidate();
    })
    .catch((error) => {
        console.log(error);
        tokenExpiredRedirect(error);
        alert.style.display = 'block';
        alert.innerHTML = 'Error in connection, Please check your internet connection and try again';
        setTimeout(() => {
            alert.style.display = 'none';
            alert.innerHTML = '';
        }, 5000);
    })
}


const createPetition = () => {
    const createPetition = document.querySelectorAll('#petition');

    for (i in createPetition) {
        if (createPetition.hasOwnProperty(i)) {
            createPetition[i].addEventListener('submit', (e) => {
                e.preventDefault();

                const id = e.target.getAttribute('index');
                const title = e.target.querySelector('#petition-title');
                const text = e.target.querySelector('#petition-body');
                const petitionErrorContainer = e.target.querySelector('.petition-error ul');
                const petitionErrorCont = e.target.querySelector('.petition-error');
                const petitionBtn = e.target.querySelector('#petition-btn');


                fetch(`${url}/petition`, {
                        method: 'POST',
                        body: JSON.stringify({
                            title: title.value,
                            text: text.value,
                            office_id: id
                        }),
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        })
                    })
                    .then(res => res.json())
                    .then((data) => {
                        if (data.status === 404) {
                            petitionErrorCont.style.display = 'block';
                            let li = createNode('li');
                            li.innerHTML = `${data.error}`;
                            append(editErrorContainer, li);
                            setTimeout(() => {
                                petitionErrorCont.style.display = 'none';
                                petitionErrorContainer.innerHTML = '';
                            }, 5000);
                        } else if (data.status === 400) {
                            const errorBag = data.errors;
                            errorBag.map((error) => {
                                let li = createNode('li');
                                li.innerHTML = `${error.msg}`;
                                petitionErrorCont.style.display = 'block';
                                append(petitionErrorContainer, li);
                                setTimeout(() => {
                                    petitionErrorCont.style.display = 'none';
                                    petitionErrorContainer.innerHTML = '';
                                }, 5000);
                            })
                        } else if (data.status === 201) {
                            alert.style.display = 'block';
                            alert.innerHTML = data.message;
                            petitionBtn.disabled = true;
                            setTimeout(() => {
                                window.location.reload();
                            }, 3000);
                        }
                    })
                    .catch(() => {
                        alert.style.display = 'block';
                        alert.innerHTML = 'Error in connection, Please check your internet connection and try again';
                        setTimeout(() => {
                            alert.style.display = 'none';
                            alert.innerHTML = '';
                        }, 5000);
                    })
            })
        }
    }
}

const aspire = () => {
    const aspire = document.querySelectorAll('#aspire-btn');
    
    for (j in aspire) {
        if (aspire.hasOwnProperty(j)) {
            aspire[j].addEventListener('click', (e) => {
                const officeId = parseInt(e.target.getAttribute('index'));
                const userId = JSON.parse(localStorage.getItem('userDetails')).id;
                const partyId = JSON.parse(localStorage.getItem('userDetails')).party_id;

                
                if (partyId === undefined | 'null') {
                    alert.style.display = 'block';
                    alert.innerHTML = 'Please Join a Party';
                    setTimeout(() => {
                        alert.style.display = 'none';
                        alert.innerHTML = '';
                    }, 5000);
                } else {
                    fetch(`${url}/office/${userId}/register`, {
                            method: 'POST',
                            body: JSON.stringify({
                                officeId: officeId,
                                partyId: partyId
                            }),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            })
                        })
                        .then(res => res.json())
                        .then((response) => {
                            console.log(response);
                            if (response.status === 409) {
                                alert.style.display = 'block';
                                alert.innerHTML = response.message;
                                setTimeout(() => {
                                    alert.style.display = 'none';
                                    alert.innerHTML = '';
                                }, 5000);
                            } else {
                                alert.style.display = 'block';
                                alert.innerHTML = `${response.message}, Please wait for a confirmation mail by Electoral body`;
                                setTimeout(() => {
                                    alert.style.display = 'none';
                                    alert.innerHTML = '';
                                    window.location.reload();
                                }, 5000);
                            }
                        })
                        .catch(() => {
                            alert.style.display = 'block';
                            alert.innerHTML = 'Error in connection, Please check your internet connection and try again';
                            setTimeout(() => {
                                alert.style.display = 'none';
                                alert.innerHTML = '';
                            }, 5000);
                        })
                }
            })
        }
    }
}

const loadCandidates = () => {
    const voterField = document.querySelectorAll('#voters');

    for (k in voterField) {
        if (voterField.hasOwnProperty(k)) {
            const event = voterField[k];
            const officeId = event.getAttribute('index');
            
            
            fetch(`${url}/office/${officeId}/candidates`, options)
            .then(res => res.json())
            .then((response) => {
                if (!response.data.length) {
                    event.innerHTML = 'No candidate yet';
                } else {
                    response.data.map((votee) => {
                        event.innerHTML += `
                            <div class="form-group mg-b-10">
                                <input type="radio" id="${votee.id}" name="candidate" value="${votee.id}">
                                <label for="${votee.id}">
                                    <span class="radio">${votee.firstname} ${votee.lastname} - ${votee.partyname}</span>
                                </label>
                            </div>
                            <button type="submit" class="btn btn-primary" id="vote-btn" style="display: ${response.data.length ? 'block' : 'none'}">Vote</button>
                        `;
                    });
                }
            })
            .catch(() => {
                alert.style.display = 'block';
                alert.innerHTML = 'Error in connection, Please check your internet connection and try again';
                setTimeout(() => {
                    alert.style.display = 'none';
                    alert.innerHTML = '';
                }, 5000);
            });
        }
    }
}

const voteCandidate = () => {
    const voteForm = document.querySelectorAll('#vote');

    for (l in voteForm) {
        if (voteForm.hasOwnProperty(l)) {
            voteForm[l].addEventListener('submit', (e) => {
                e.preventDefault();
                const officeId = parseInt(e.target.getAttribute('office-id'));
                const candidateId = document.querySelector("input[name='candidate']:checked").value || null;
                const voteBtn = document.querySelector('vote-btn');

                console.log(candidateId);
                
                if (candidateId === null) {
                    alert.style.display = 'block';
                    alert.innerHTML = 'Please select a valid candidate';
                    setTimeout(() => {
                        alert.style.display = 'none';
                        alert.innerHTML = '';
                    }, 4000);
                }

                fetch(`${url}/votes`, {
                    method: 'POST',
                    body: JSON.stringify({
                        officeId,
                        candidateId
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    })
                })
                .then(res => res.json())
                .then((response) => {
                    if (response.status === 409) {
                        alert.style.display = 'block';
                        alert.innerHTML = response.message;
                        setTimeout(() => {
                            alert.style.display = 'none';
                            alert.innerHTML = '';
                        }, 5000);
                    } else if (response.status === 201) {
                        alert.style.display = 'block';
                        alert.innerHTML = response.message;
                        voteBtn.disabled = true;
                        setTimeout(() => {
                            alert.style.display = 'none';
                            alert.innerHTML = '';
                        }, 4000);
                    }
                })
                .catch((error) => {
                    alert.style.display = 'block';
                    alert.innerHTML = 'Error in connection, Please check your internet connection and try again';
                    setTimeout(() => {
                        alert.style.display = 'none';
                        alert.innerHTML = '';
                    }, 5000);
                    console.log(error);
                })
            });
        }
    }
    
}