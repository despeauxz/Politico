const url = 'https://cryptic-escarpment-28116.herokuapp.com/api/v1/parties';
const addParty = document.getElementById('add-party');
const name = document.getElementById('name');
const hqAddr = document.getElementById('hq_addr');
const logoURL = document.getElementById('logo_url');
const errorContainer = document.querySelector('.errors ul');
const errorCont = document.querySelector('.errors');
const alert = document.querySelector('.alert');
const token = localStorage.getItem('token');

if (localStorage.getItem('loggedIn')) {
    if (localStorage.getItem('admin') === 'null') {
        window.location = './profile.html';
    }
} else {
    window.location = './login.html';
}

const createNode = (element) => {
    return document.createElement(element);
}

const append = (parent, el) => {
    return parent.appendChild(el);
}

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
