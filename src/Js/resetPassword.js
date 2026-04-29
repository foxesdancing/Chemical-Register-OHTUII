document.addEventListener("DOMContentLoaded", async function () {

    const { data } = await window.supabase.auth.getSession();

    if (!data.session) {
        alert("Invalid or expired reset link.");
        window.location.href = "index.html";
        return;
    }

    const form = document.getElementById("resetForm");
    const passwordInput = document.getElementById("newPassword");
    const confirmInput = document.getElementById("confirmPassword");


    form.addEventListener("submit", async function (e) {
        e.preventDefault();

       const newPassword = passwordInput.value.trim();
       const confirmPassword = confirmInput.value.trim();

       if (!newPassword || !confirmPassword) {
            alert("Please fill in both fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            confirmInput.focus();
            return;
        }

        const { error } = await window.supabase.auth.updateUser({
            password: newPassword
        });

        if (error) {
            alert("Error" + error.message);
            return;
        }
        alert("Password updated successfully.");
        window.location.href = "index.html";
    });
});