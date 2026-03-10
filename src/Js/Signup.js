// Wait until DOM loads
console.log("Signup.js is triggered");
document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const confirmPasswordInput = document.querySelector('input[name="confirm-password"]');

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Stop form submission

        
        
        // Clear previous errors
        clearErrors();

        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === "") {
            showError(nameInput, "Name is required");
            isValid = false;
        }

        // Email validation
        if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, "Enter a valid email address");
            isValid = false;
        }

        // Password validation
        if (passwordInput.value.length < 6) {
            showError(passwordInput, "Password must be at least 6 characters");
            isValid = false;
        }

        // Confirm password validation
        if (confirmPasswordInput.value !== passwordInput.value) {
            showError(confirmPasswordInput, "Passwords do not match");
            isValid = false;
        }

        // If all valid
        if (isValid) {
            console.log("Validation passed, attempting Supabase signup…");

            const email = emailInput.value.trim();
            const password = passwordInput.value;

            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });

            if (error) {
                console.error(error);
                showError(emailInput, error.message);
                return;
            }

            alert("Signup successful! Check your email for verification.");
            form.reset();

        }
    });

    // Email regex validation
    function validateEmail(email) {
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        return emailPattern.test(email);
    }

    // Show error message
    function showError(input, message) {
        const error = document.createElement("small");
        error.style.color = "red";
        error.style.display = "block";
        error.style.marginTop = "5px";
        error.textContent = message;

        input.parentElement.appendChild(error);
        input.style.borderColor = "red";
    }

    // Clear previous errors
    function clearErrors() {
        const errors = document.querySelectorAll("small");
        errors.forEach(error => error.remove());

        const inputs = document.querySelectorAll("input");
        inputs.forEach(input => input.style.borderColor = "#D0D0D0");
    }

});