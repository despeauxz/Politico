const url = 'http://localhost:8000/api/v1/offices';
const addOffice = document.getElementById('add-office');
const officeBody = document.getElementById('office');
const name = document.getElementById('name');
const type = document.getElementById('office-type');
const errorContainer = document.querySelector('.errors ul');
const errorCont = document.querySelector('.errors');
const alert = document.querySelector('.alert');



addOffice.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log(name.value);
    console.log(type.value);
    
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: name.value,
            type: type.value
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        })
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
        } else if (response.status === 400) {
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
        } else if (response.status === 201) {
            alert.style.display = 'block';
            alert.innerHTML = response.message;
            addBtn.disabled = true;
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        }
    })
    .catch(() => {
        alert.style.display = 'block';
        alert.innerHTML = 'Error in connecting, Please check your internet connection and try again';
        setTimeout(() => {
            alert.style.display = 'none';
            alert.innerHTML = '';
        }, 5000);
    })
});


(() => {
    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    })
    .then(res => res.json())
    .then((data) => {
        const offices = data.data;
        if (!offices.length) {
            officeBody.innerHTML = '<p class="text-center">No Office at this moment</p>';
        } else {
            offices.map((office) => {
                officeBody.innerHTML += `
                    <div class="cards card-wrap text-center">
                        <h2 class="card_title">${office.name}</h2>
                        <p class="card_body">${office.type}</p>
                    </div>
                `
            })
        }
    })
    .catch(() => {
        alert.style.display = 'block';
        alert.innerHTML = 'Error in connecting, Please check your internet connection and try again';
        setTimeout(() => {
            alert.style.display = 'none';
            alert.innerHTML = '';
        }, 5000);
    })
})();