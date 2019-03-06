const url = 'http://localhost:8000/api/v1/parties';
const addParty = document.getElementById('add-party');
const partyBody = document.getElementById('party');
const name = document.getElementById('name');
const hqAddr = document.getElementById('hq_addr');
const logoURL = document.getElementById('logo_url');
const errorContainer = document.querySelector('.errors ul');
const errorCont = document.querySelector('.errors');
const alert = document.querySelector('.alert');


addParty.addEventListener('submit', (e) => {
    e.preventDefault();
    const addBtn = e.target.querySelector('#add-btn');

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: name.value,
            hq_address: hqAddr.value,
            logo_url: logoURL.value
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        })
    })
    .then(res => res.json())
    .then((response) => {
        if (response.error) {
            errorCont.style.display = 'block';
            let li = createNode('li');
            li.innerHTML = `${response.error}`;
            append(errorContainer, li);
            setTimeout(() => {
                errorCont.style.display = 'none';
                errorContainer.innerHTML = '';
            }, 5000);
        } else if (response.status === 400) {
            const errorBag = response.errors;
            errorBag.map((error) => {
                let li = createNode('li');
                li.innerHTML = `${error.msg}`;
                errorCont.style.display = 'block';
                append(errorContainer, li);
                setTimeout(() => {
                    errorCont.style.display = 'none';
                    errorContainer.innerHTML = '';
                }, 5000);
            })
        } else if (response.status === 201) {
            alert.style.display = 'block';
            alert.innerHTML = response.message;
            addBtn.disabled = true;
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        }
    })
    .catch((error) => {
        alert.style.display = 'block';
        alert.innerHTML = 'Error in connecting, Please check your internet connection and try again';
        setTimeout(() => {
            alert.style.display = 'none';
            alert.innerHTML = '';
        }, 5000);
    })
});

(() => {
    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    })
    .then(res => res.json())
    .then((data) => {
        const parties = data.data;
        if (!parties.length) {
            partyBody.innerHTML = '<p class="text-center text-md">No party at this moment</p>';
        }else {
            parties.forEach(party => {
                partyBody.innerHTML += `
                <div class="cards card-wrap">
                    <h2 class="card_title">${party.name}</h2>
                    <p class="card_body">${party.hq_address}</p>
                    <div class="more">
                        <span class="ion-android-more-horizontal"></span>
                        <ul>
                            <li><a href="#" data-modal="#edit-${party.id}">Edit</a></li>
                            <li><a href="#" data-modal="#delete-${party.id}">Delete</a></li>
                        </ul>
                    </div>
                    <div class="modal" id="edit-${party.id}">
                        <div class="modal-container">
                            <div class="modal_title text-center">
                                <h2>Edit Party</h2>
                            </div>
                            <div class="modal_body">
                                <div class="errors form-group edit-error">
                                    <ul></ul>
                                </div>
                                <form role="form" method="POST" id="edit-party" index="${party.id}">
                                    <div class="d-flex-col">
                                        <div class="form-group">
                                            <label for="" class="control-label"> Name </label>
                                            <input id="edit-name" type="text" name="name" class="form-control" value="${party.name}">
                                        </div>
                                        <div class="form-group">
                                            <label for="" class="control-label"> HQ Address </label>
                                            <input disabled type="text" name="hq-addr" class="form-control" value="${party.hq_address}">
                                        </div>
                                        <div class="form-group">
                                            <label for="" class="control-label"> Logo URL </label>
                                            <input disabled type="text" name="logo_url" class="form-control" value="${party.logo_url}">
                                        </div>
                                        <button class="btn btn-primary" type="submit" id="edit-btn">Edit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal" id="delete-${party.id}">
                        <div class="modal-container">
                            <div class="modal_title text-sm text-center">
                                <h2 class="text-sm">Are you sure you want delete this Party?</h2>
                            </div>
                            <div class="modal_body text-center">
                                <button class="btn btn-danger" index="${party.id}" id="delete-btn">Yes</button>
                                <button class="btn btn-primary" id="">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            })
        }
    })
    .catch(() => {
        alert.style.display = 'block';
        alert.innerHTML = 'Error in connecting, Please check your internet connection and try again';
        setTimeout(() => {
            alert.style.display = 'none';
            alert.innerHTML = '';
        }, 5000);
    })
})();


setTimeout(() => {
    const editParty = document.querySelectorAll('#edit-party');
    const deleteParty = document.querySelectorAll('#delete-btn');
    const alert = document.querySelector('.alert');
   

    // Edit Party
    for(i in editParty) {
        if (editParty.hasOwnProperty(i)) {
            editParty[i].addEventListener('submit', (e) => {
                e.preventDefault();
                const id = e.target.getAttribute('index');
                const editValue = e.target.querySelector('#edit-name').value;
                const editErrorContainer = e.target.querySelector('.edit-error ul');
                const editErrorCont = e.target.querySelector('.edit-error');
                const editBtn = e.target.querySelector('#edit-btn');
                
                fetch(`${url}/${id}/name`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        name: editValue
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    })
                })
                .then(res => res.json())
                .then((response) => {
                    if (response.error) {
                        editErrorCont.style.display = 'block';
                        let li = createNode('li');
                        li.innerHTML = `${response.error}`;
                        append(editErrorContainer, li);
                        setTimeout(() => {
                            editErrorCont.style.display = 'none';
                            editErrorContainer.innerHTML = '';
                        }, 5000);
                    } else if (response.status === 400) {
                        const errorBag = response.errors;
                        errorBag.map((error) => {
                            let li = createNode('li');
                            li.innerHTML = `${error.msg}`;
                            errorCont.style.display = 'block';
                            append(editErrorContainer, li);
                            setTimeout(() => {
                                editErrorCont.style.display = 'none';
                                editErrorContainer.innerHTML = '';
                            }, 5000);
                        })
                    } else if (response.status === 200) {
                        alert.style.display = 'block';
                        alert.innerHTML = response.message;
                        editBtn.disabled = true;
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    }
                })
                .catch((error) => {
                    alert.style.display = 'block';
                    alert.innerHTML = error;
                    setTimeout(() => {
                        alert.style.display = 'none';
                        alert.innerHTML = '';
                    }, 5000);
                })
            });
        }
    }

    // Delete Party
    for (j in deleteParty) {
        if (deleteParty.hasOwnProperty(j)) {
            deleteParty[j].addEventListener('click', (e) => {
                e.preventDefault();
                const id = e.target.getAttribute('index');

                fetch(`${url}/${id}`, {
                    method: 'DELETE',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    })
                })
                .then(res => res.json())
                .then((response) => {
                    if (response.status === 200) {
                        alert.style.display = 'block';
                        alert.innerHTML = response.message;
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    }
                })
                .catch((error) => {
                    alert.style.display = 'block';
                    alert.innerHTML = 'Error in connecting, Please check your internet connection and try again';
                    setTimeout(() => {
                        alert.style.display = 'none';
                        alert.innerHTML = '';
                    }, 5000);
                })
                
            })
        }
    }

}, 5000);
