const container = document.querySelector('.container');
const regiserBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

regiserBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});
function redirectToShop(e) {
    e.preventDefault(); // prevent form from reloading
    window.location.href = "shop.html"; // redirect to shop page
}

