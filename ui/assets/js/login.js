const url = 'http://localhost:8000/api/v1/auth/login';
const login = document.getElementById('login');

const email = document.getElementById('login-email');
const password = document.getElementById('login-password');
const errorContainer = document.querySelector('.errors ul');
const errorCont = document.querySelector('.errors');
const loader = document.querySelector('.loader');


login.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            email: `${email.value}`,
            password: `${password.value}`
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then((response) => {
        if (response.status === 400) {
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
        }else if (response.status === 401) {
            errorCont.style.display = 'block';
            errorContainer.innerHTML = response.error;
            setTimeout(() => {
                errorCont.style.display = 'none';
                errorContainer.innerHTML = '';
            }, 5000);
        }else if(response.status === 200) {
            loader.style.display = 'block';
            loader.style.height = '100vh';
            setTimeout(() => {
                if (response.data.user.is_admin === true) {
                    window.location = './dashboard.html'
                } else {
                    window.location = './profile.html'
                }
            }, 5000);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userDetails', JSON.stringify(response.data.user));
            localStorage.setItem('admin', response.data.user.is_admin);
            localStorage.setItem('loggedIn', true);
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