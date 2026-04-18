console.log("session.js is triggered");




async function getCurrentSession() {
    const { data, error } = await window.supabase.auth.getSession();

    if (error) {
        console.error("Error getting session:", error);
        return null;
    }

    return data.session;
}

async function requireSession() {
    const session = await getCurrentSession();

    if (!session) {
        window.location.href = "index.html";
        return null;
    }

    return session;
}

async function redirectIfLoggedIn() {
    const session = await getCurrentSession();

    if (session) {
        window.location.href = "mainPage.html";
    }
}

async function logoutUser() {
    const { error } = await window.supabase.auth.signOut();

    if (error) {
        console.error("Logout failed:", error);
        alert("Logout failed: " + error.message);
        return;
    }

    window.location.href = "index.html";
}

// Expose functions globally
window.getCurrentSession = getCurrentSession;
window.requireSession = requireSession;
window.redirectIfLoggedIn = redirectIfLoggedIn;
window.logoutUser = logoutUser;