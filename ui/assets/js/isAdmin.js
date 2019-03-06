const token = localStorage.getItem('token');

if (localStorage.getItem('loggedIn')) {
    if (localStorage.getItem('admin') === 'null') {
        window.location.href = './profile.html';
    }
} else {
    window.location.href = './login.html';
}