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
    await useFetchedChemicals(); // Loads chemicals as unordered list (Jarre)

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
                <td>Name: ${chemical.name ?? ""}</td>
                <td>Chemical formula: ${chemical.chemical_formula ?? ""}</td>
                <td>Purpose of use: ${chemical.use_purpose ?? ""}</td>
                <td> Supplier: ${chemical.supplier ?? ""}</td>
                <td>Storage information: ${chemical.storage_information ?? ""}</td>
            `;

            chemicalsBody.appendChild(row);
        });
    }

    // Function to print chemical list into the mainpage (Jarre)
    async function useFetchedChemicals(){
        // Create unordered list and append it into div (id = fetchedChemicals).
        const list = document.createElement("ul");
        document.getElementById("fetchedChemicals").appendChild(list);

        // Array of the chemicals
        const chemicals = await fetchChemicals();

        // Append each 
        chemicals.forEach(chemical => {
            const listItem = document.createElement("li");

            listItem.innerHTML = `
                <p>Name: ${chemical.name}</p>
                <p>Formula: ${chemical.formula}</p>
                <p>Storage: ${chemical.storage}</p>
                <p>H-Phrases: ${chemical.h_phrases.join(", ")}</p>
                <p>P-Phrases: ${chemical.p_phrases.join(", ")}</p>
                <div class="pictograms"></div>
                <a href="${chemical.safety_data_sheet}">View details</a>
            `;

            // Create pictograms container, which loads all pictograms to the list (Jarre)
            const pictogramContainer = listItem.querySelector(".pictograms");

            chemical.pictograms.forEach(path =>{
                const img = document.createElement("img");
                img.src = path;
                img.width = 75;
                img.height = 75;
                pictogramContainer.appendChild(img);
            })

            list.appendChild(listItem);

            console.log(chemical.name);
            console.log(chemical.formula);
        });
    }
});