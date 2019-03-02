const url = 'https://cryptic-escarpment-28116.herokuapp.com/api/v1/auth/details';
// const token = localStorage.getItem('token');
const alert = document.querySelector('.alert');
const user = document.querySelector('.user-detail');
const party = document.querySelector('.party-detail');
const office = document.querySelector('.office-detail');
const options = {
    method: 'GET',
    headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    })
};


(() => {
    fetch(url, options)
    .then(res => res.json())
    .then((response) => {
        user.innerHTML = response.data.users;
        office.innerHTML = response.data.offices;
        party.innerHTML = response.data.parties;
    })
    .catch((error) => {
        alert.style.display = 'block';
        alert.innerHTML = error;
        setTimeout(() => {
            alert.style.display = 'none';
            alert.innerHTML = '';
        }, 5000);
    });
})();
