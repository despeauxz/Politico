const token = localStorage.getItem('token');

if (localStorage.getItem('loggedIn')) {
    if (localStorage.getItem('admin') === 'true') {
        window.history.back();
    }
    const username = document.getElementById('user-name');
    const user = JSON.parse(localStorage.getItem('userDetails'));
    const fullName = `${user.firstname} ${user.lastname}`;
    username.textContent = fullName;
} else {
    window.location.href = './login.html';
}

const tokenExpiredRedirect = (error) => {
    if (error.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userDetails');
        localStorage.removeItem('admin');
        localStorage.removeItem('loggedIn');
        window.location.href = './login.html';
    }
}
