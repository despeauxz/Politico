if (localStorage.getItem('loggedIn')) {
    if (localStorage.getItem('admin') === 'true') {
        window.history.back();
    }
    const token = localStorage.getItem('token');
    const username = document.getElementById('user-name');
    const user = JSON.parse(localStorage.getItem('userDetails'));
    const fullName = `${user.firstname} ${user.lastname}`;
    username.textContent = fullName;
} else {
    window.location.href = './login.html';
}
