if (localStorage.getItem('loggedIn')) {
    if (localStorage.getItem('admin') === 'true') {
        window.history.back();
    }
} else {
    window.location.href = './login.html';
}