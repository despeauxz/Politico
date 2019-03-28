const url = 'https://cryptic-escarpment-28116.herokuapp.com/api/v1';
const partyContainer = document.getElementById('parties');
const alert = document.querySelector('.alert');
const options = {
    method: 'GET',
    headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
}

window.onload = () => {
    const partyId = JSON.parse(localStorage.getItem('userDetails')).party_id;

    fetch(`${url}/parties`, options)
    .then(res => res.json())
    .then((response) => {
        response.data.map((party) => {
            partyContainer.innerHTML += `
                <div class="cards card-wrap">
                    <div>
                        <p style="display: ${party.id === partyId ? 'block': 'none'};color: #4dc0b5;">Member</p>
                        <button style="display: ${party.id != partyId ? 'block': 'none'}" index="${party.id}" class="btn-xs btn-primary" id="join-party">Join</button>
                    </div>
                    <h2 class="card_title text-small text-center">${party.name}</h2>
                    <p class="card_body">${party.hq_address}</p>
                    <p class="card_body"></p>
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
}

setTimeout(() => {
    const alert = document.querySelector('.alert');
    const join = document.querySelectorAll('#join-party');    

    for (j in join) {
        if (join.hasOwnProperty(j)) {
            join[j].addEventListener('click', (e) => {
                const id = e.target.getAttribute('index');
                
                fetch(`${url}/auth/join-party`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        party_id: id
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    })
                })
                .then(res => res.json())
                .then((response) => {
                    alert.style.display = 'block';
                    alert.innerHTML = response.message;
                    this.disabled = true;
                    localStorage.setItem('userDetails', JSON.stringify(response.data));
                    setTimeout(() => {
                        alert.style.display = 'none';
                        alert.innerHTML = '';
                        window.location.reload();
                    }, 5000);
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
}, 4000);