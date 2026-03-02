// Select the elements
const loginForm = document.querySelector('.login-card'); 
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const loginBtn = document.querySelector('.login-btn');

// Helping function: email validation
function isValidEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
}

// Handling the Login Click
loginBtn.addEventListener('click', function(e) {
    e.preventDefault(); 

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validation
    if (email === '') {
        alert('Please enter your email address.');
        emailInput.focus();
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
    }

    if (password === '') {
        alert('Please enter your password.');
        passwordInput.focus();
        return;
    }

    // Success Simulation
    alert('Login successful! (This is just front-end simulation.)');

    // Optional: clear inputs
    emailInput.value = '';
    passwordInput.value = '';
});
