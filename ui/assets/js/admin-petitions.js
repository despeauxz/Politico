const url = 'https://cryptic-escarpment-28116.herokuapp.com/api/v1/petition';
const petitionBody = document.getElementById('petition-body');
const petitionDetails = document.getElementById('petition-details');
const alert = document.querySelector('.alert');
const options = {
    method: 'GET',
    headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
};

window.onload = () => {
    fetch(url, options)
    .then(res => res.json())
    .then((response) => {
        if (response.rowCount === 0) {
            petitionBody.textContent = 'No petition has been layed at this moment';
        } else {
            response.data.map((petition, index) => {
                petitionBody.innerHTML += `
                    <div class="item ${index === 0 ? 'active' : ''}">
                        <div class="title">
                            <h5 style="text-transform: uppercase;">${petition.title}</h5>
                            <i class="fa fa-plus"></i>
                        </div>
                        <div class="accordion-info ${index === 0 ? 'active' : ''}">
                            <span style="font-weight: 600;">Petition By: ${petition.firstname} ${petition.lastname}</span>
                            <span style="float: right;font-weight: 600;">Office: ${petition.officename}</span>
                            <p>${petition.text}</p>
                        </div>
                    </div>
                `
            })
        }
        petitionDetails.textContent = `Petitions (${response.data.length})`;
    })
    .catch((error) => {
        tokenExpiredRedirect(error);
        alert.style.display = 'block';
        alert.innerHTML = 'Error in connection, Please check your internet connection and try again';
        setTimeout(() => {
            alert.style.display = 'none';
            alert.innerHTML = '';
        }, 5000);
    })
}
