const url = 'https://cryptic-escarpment-28116.herokuapp.com/api/v1/parties';
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
    fetch(url, options)
    .then(res => res.json())
    .then((response) => {
        response.data.map((party) => {
            partyContainer.innerHTML += `
                <div class="cards card-wrap">
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