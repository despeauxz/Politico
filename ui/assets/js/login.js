$('form').on('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email === 'admin' && password === 'password') {
        window.location.href = './dashboard.html';  
    } else {
        window.location.href = './user-auth.html';
    }
});