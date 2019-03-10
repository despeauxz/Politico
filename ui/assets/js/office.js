const alert = document.querySelector('.alert');
const userName = document.getElementById('user-name');
const officeContainer = document.getElementById('user-office');
const url = 'https://cryptic-escarpment-28116.herokuapp.com/api/v1';
const user = JSON.parse(localStorage.getItem('userDetails'));
const fullname = `${user.firstname} ${user.lastname}`;

userName.textContent = fullname;
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
                                <form role="form" method="POST" enctype="multipart/form-data">
                                    <div class="d-flex-col">
                                        <div class="form-group">
                                            <label for="title" class="control-label">Title</label>
                                            <input type="text" name="title" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label for="body" class="control-label">Reason?</label>
                                            <textarea name="body" class="form-control" rows="5"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <input type="file" id="file" name="evidence" />
                                            <label for="file">Upload Evidence</label>
                                        </div>
                                        <button class="btn btn-primary" type="submit">Submit</button>
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
    
}, 5000);