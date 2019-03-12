const alert = document.querySelector('.alert');
const officeContainer = document.getElementById('user-office');
const url = 'https://cryptic-escarpment-28116.herokuapp.com/api/v1';
const options = {
    method: 'GET',
    headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
};

(() => {
    fetch(`${url}/offices`, options)
    .then(res => res.json())
    .then((response) => {
        response.data.map((office) => {
            officeContainer.innerHTML += `
                <div class="cards card-wrap">
                    <h2 class="card_title text-small text-center" style="text-transform: capitalize;font-size: 15px;">${office.name}</h2>
                    <p class="card_body">${office.type}</p>
                    <p class="card_body">Validity: </p>
                    <div class="more">
                        <span class="ion-android-more-horizontal"></span>
                        <ul>
                            <li><a href="#" data-modal="#vote-${office.id}">Vote</a></li>
                            <li><a href="#" data-modal="#aspire-${office.id}">Aspire</a></li>
                            <li><a href="#" data-modal="#petition-${office.id}">Petition</a></li>
                        </ul>
                    </div>

                    <div class="modal" id="vote-${office.id}">
                        <div class="modal-container">
                            <div class="modal_body">
                                <form role="form" method="POST">
                                    <div class="d-flex-col office text-center">
                                        <div class="form-group mg-b-10">
                                            <input type="radio" id="1" name="candidate" value="">
                                            <label for="1">
                                                <span class="radio">Fela Durotoye - ADP</span>
                                            </label>
                                        </div>
                                        <button class="btn btn-primary" type="submit">Vote</button>
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
                                <button class="btn btn-danger">Yes</button>
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
            })
        }
    }
}, 4000);