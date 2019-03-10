const url = 'https://cryptic-escarpment-28116.herokuapp.com/api/v1/auth/user';
const data = JSON.parse(localStorage.getItem('userDetails'));

const updateUser = document.getElementById('update-user');
const history = document.getElementById('history');
const historyRow = document.getElementsByName('tbody');
const fullname = document.getElementById('fullname');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const avatar = document.getElementById('file');
const userName = document.getElementById('user-name');
const userImg = document.getElementById('user-img');
const alert = document.querySelector('.alert');
firstname.value = data.firstname;
lastname.value = data.lastname;
email.value = data.email;
fullname.textContent = `${data.firstname} ${data.lastname} ${data.othername}`;
userName.textContent = `${data.firstname} ${data.lastname}`;
userImg.src = `${data.avatar}`;


updateUser.addEventListener('submit', (e) => {
    e.preventDefault();
    const editBtn = e.target.querySelector('#edit-user');

    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
            firstname: firstname.value,
            lastname: lastname.value
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    })
    .then(res => res.json())
    .then((response) => {
        if(response.status === 200) {
            localStorage.setItem('userDetails', JSON.stringify(response.data));
            alert.style.display = 'block';
            alert.innerHTML = response.message;
            editBtn.disabled = true;
            setTimeout(() => {
                window.location.reload();
            }, 3000);
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
   
});

(() => {
    fetch('https://cryptic-escarpment-28116.herokuapp.com/api/v1/votes/history', {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    })
    .then(res => res.json())
    .then((response) => {
        if (response.rowCount === 0) {
            history.innerHTML = '<p class="text-center">You currently do not have voting history</p>';
        }else {
            response.data.map((data) => {
                historyRow.innerHTML += `
                    <tr>
                        <td class="v-align-middle"><p></p></td>
                        <td class="v-align-middle"><p>${data.firstname} ${data.lastname}</p></td>
                        <td class="v-align-middle"><p>${data.partyname}</p></td>
                        <td class="v-align-middle"><p>${data.officename}</p></td>
                    </tr>
                `  
            })
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
})();
