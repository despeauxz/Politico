const url = 'https://cryptic-escarpment-28116.herokuapp.com/api/v1/parties';
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
                DOMContentLoaded
                errorContainer.innerHTML = '';
            }, 5000);
        }else if (response.status === 400) {
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
        }else if (response.status === 201) {
            alert.style.display = 'block';
            alert.innerHTML = response.message;
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        }
    })
    .catch((error) => {
        errorCont.style.display = 'block';
        let msg = createNode('li');
        msg.innerHTML = 'Error in connecting, Please check your internet connection and try again';
        append(errorContainer, msg);
        setTimeout(() => {
            errorCont.style.display = 'none';
            errorContainer.innerHTML = '';
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
        parties.map((party) => {
            partyBody.innerHTML += `
                <div class="cards card-wrap">
                    <h2 class="card_title">${party.name}</h2>
                    <p class="card_body">${party.hq_address}</p>
                    <div class="more">
                        <span class="ion-android-more-horizontal"></span>
                        <ul>
                            <li><a href="#" data-modal="#edit-${party.id}">Edit</a></li>
                            <li><a href="#" data-modal="#delete">Delete</a></li>
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
                </div>
            `
        })
    })
})();

setTimeout(() => {
    const editParty = document.getElementById('edit-party');
    const editName = document.getElementById('edit-name');
    const errorContainer = document.querySelector('.edit-error ul');
    const errorCont = document.querySelector('.edit-error');
    const alert = document.querySelector('.alert');

    const createNode = (element) => {
        return document.createElement(element);
    }

    const append = (parent, el) => {
        return parent.appendChild(el);
    }

    editParty.addEventListener('submit', (e) => {
        e.preventDefault();
        const event = e.target;        
        const id = event.getAttribute('index');
        fetch(`${url}/${id}/name`, {
            method: 'PATCH',
            body: JSON.stringify({
                name: editName.value
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
                errorCont.style.display = 'block';
                let li = createNode('li');
                li.innerHTML = `${response.error}`;
                append(errorContainer, li);
                setTimeout(() => {
                    errorCont.style.display = 'none';
                    DOMContentLoaded
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
            } else if (response.status === 200) {
                alert.style.display = 'block';
                alert.innerHTML = response.message;
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            }
        })
    });
}, 5000);