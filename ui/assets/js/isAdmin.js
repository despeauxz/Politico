const token = localStorage.getItem('token');

if (localStorage.getItem('loggedIn')) {
    if (localStorage.getItem('admin') === 'null') {
        window.location = './profile.html';
    }
} else {
    window.location = './login.html';
}