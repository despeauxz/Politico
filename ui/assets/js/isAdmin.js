const token = localStorage.getItem('token');

if (localStorage.getItem('loggedIn')) {
    if (localStorage.getItem('admin') === 'null') {
        window.location.href = './profile.html';
    }
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