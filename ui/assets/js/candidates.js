const url = 'https://cryptic-escarpment-28116.herokuapp.com/api/v1';
const alert = document.querySelector('.alert');
const candidateContainer = document.getElementById('candidate-container');
const candidateField = document.getElementById('candidates');
const options = {
    method: 'GET',
    headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
};

window.onload = () => {
    fetch(`${url}/office/candidates`, options)
    .then(res => res.json())
    .then((response) => {
        if (!response.data.length) {
            candidateContainer.innerHTML = '<h3>No registered candidate at this moment</h3>'
        }else {
            response.data.map((candidate, index) => {
                candidateField.innerHTML += `
                    <tr>
                        <td>
                            <p>${index+1}</p>
                        </td>
                        <td>
                            <p>${candidate.firstname} ${candidate.lastname}</p>
                        </td>
                        <td>
                            <p>${candidate.partyname}</p>
                        </td>
                        <td>
                            <p>${candidate.officename}</p>
                        </td>
                        <td>
                            <button index="${candidate.id}" class="btn-xs ${candidate.confirm ? 'btn-disabled': 'btn-primary'}" id="confirm-button">${candidate.confirm ? 'Confirmed': 'Confirm'}</button>
                        </td>
                    </tr>
                `
            })
        }
    })
    .then(() => {
        confirmCandidate();
    })
    .catch((error) => {
        tokenExpiredRedirect(error);
        alert.style.display = 'block';
        alert.innerHTML = 'Error in connection, Please check your internet connection and try again';
        setTimeout(() => {
            alert.style.display = 'none';
            alert.innerHTML = '';
        }, 5000);
    });
}


const confirmCandidate = () => {
    const confirmBtn = document.querySelectorAll('#confirm-button');
    
    for(i in confirmBtn) {
        if (confirmBtn.hasOwnProperty(i)) {
            confirmBtn[i].addEventListener('click', (e) => {
                const id = e.target.getAttribute('index');

                fetch(`${url}/office/candidate/${id}`, {
                    method: 'PATCH',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    })
                })
                .then(res => res.json())
                .then((response) => {
                    alert.style.display = 'block';
                    alert.innerHTML = response.message;
                    setTimeout(() => {
                        alert.style.display = 'none';
                        alert.innerHTML = '';
                        window.location.reload();
                    }, 5000);
                })
                .catch(() => {
                    alert.style.display = 'block';
                    alert.innerHTML = 'Error in connection, Please check your internet connection and try again';
                    setTimeout(() => {
                        alert.style.display = 'none';
                        alert.innerHTML = '';
                    }, 5000);
                });
            });
        }
    }
}
