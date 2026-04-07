console.log("mainPageScript.js loaded");

document.addEventListener("DOMContentLoaded", async function () {
    const welcomeText = document.getElementById("welcomeText");
    const logoutBtn = document.getElementById("logoutBtn");
    const chemicalsStatus = document.getElementById("chemicalsStatus");
    const chemicalsBody = document.getElementById("chemicalsBody");

    // Require session
    const session = await window.requireSession();
    if (!session) return;

    // Show logged in user
    const user = session.user;
    welcomeText.textContent = "Logged in as: " + user.email;

    // Logout
    logoutBtn.addEventListener("click", async function () {
        await window.logoutUser();
    });

    // Load chemicals
    await loadChemicals();

    async function loadChemicals() {
        chemicalsStatus.textContent = "Loading chemicals...";
        chemicalsBody.innerHTML = "";

        try {
            const chemicals = await window.getChemicals();

            if (!chemicals || chemicals.length === 0) {
                chemicalsStatus.textContent = "No chemicals found.";
                return;
            }

            chemicalsStatus.textContent = "";
            renderChemicals(chemicals);

        } catch (error) {
            console.error("Failed to load chemicals:", error);
            chemicalsStatus.textContent = "Error loading chemicals.";
        }
    }

    function renderChemicals(chemicals) {
        chemicals.forEach(function (chemical) {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${chemical.name ?? ""}</td>
                <td>${chemical.chemical_formula ?? ""}</td>
                <td>${chemical.use_purpose ?? ""}</td>
                <td>${chemical.supplier ?? ""}</td>
                <td>${chemical.storage_information ?? ""}</td>
            `;

            chemicalsBody.appendChild(row);
        });
    }
});