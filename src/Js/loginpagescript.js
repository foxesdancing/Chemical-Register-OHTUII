console.log("loginpagescript.js is triggered");

// Select the elements
const loginForm = document.querySelector('.login-form'); 
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const loginBtn = document.querySelector('.login-btn');

// Helping function: email validation
function isValidEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
}

// Handling the Login (changed click with submit, so pressing enter works too)
loginForm.addEventListener('submit', async function(e) {
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

    console.log("Attempting logging in");
    // Supabase function for loggin the user in
    const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error(error);
            alert("Login failed: " + error.message);
            return;
        }

        window.location = "mainPage.html";

    // Optional: clear inputs
    emailInput.value = '';
    passwordInput.value = '';
});
