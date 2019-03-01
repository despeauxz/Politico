const url = 'https://cryptic-escarpment-28116.herokuapp.com/api/v1/auth/signup';
const signup = document.getElementById('signup');

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const othername = document.getElementById('othername');
const digit = document.getElementById('digit');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');
const errorContainer = document.querySelector('.errors ul');
const errorCont = document.querySelector('.errors');
const loader = document.querySelector('.loader');
const alert = document.querySelector('.alert');

const createNode = (element) => {
    return document.createElement(element);
}

const append = (parent, el) => {
    return parent.appendChild(el);
}


signup.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            firstname: `${firstname.value}`,
            lastname: lastname.value,
            othername: othername.value,
            email: email.value,
            digit: digit.value,
            password: password.value,
            passwordConfirm: passwordConfirm.value
        }),
        headers: {
            'Content-Type': 'application/json',
        }
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
            loader.style.display = 'block';
            loader.style.height = '180%';
            setTimeout(() => {
                if (response.data.user.is_admin === true) {
                    window.location = './dashboard.html'
                } else {
                    window.location = './user-auth.html'
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
    });
});
