const logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('admin');
    localStorage.removeItem('loggedIn');
    window.location.href = './index.html';
})
