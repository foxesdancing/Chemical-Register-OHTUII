console.log("mainPageScript.js loaded");

document.addEventListener("DOMContentLoaded", async function () {
    const logoutBtn = document.getElementById("logoutBtn");

    // Require session
    const session = await window.requireSession();
    if (!session) return;

    // Logout
    logoutBtn.addEventListener("click", async function () {
        await window.logoutUser();
    });

    // Load chemicals
    await useFetchedChemicals(); // Loads chemicals as unordered list (Jarre)

    // Function to print chemical list into the mainpage (Jarre)
    async function useFetchedChemicals(){

        // Lets declare the section element, where we will append the chemicals
        const chemicalSection = document.getElementById("cardsContainer");

        // Array of the chemicals
        const chemicals = await fetchChemicals();

        // Append each 
        chemicals.forEach(chemical => {
            const divItem = document.createElement("div");
            divItem.className = "card";

            divItem.innerHTML = `
                <h3>Name: ${chemical.name}</h3>
                <p>Formula: ${chemical.formula}</p>
                <p class="date">Chemical added: ${chemical.created}</p>
                <p>${chemical.h_phrases.join(". ")}</p>
                <p>${chemical.p_phrases.join(". ")}</p>
                <p>Storage: ${chemical.storage}</p>
                <div class="pictograms"></div>
                <a href=${chemical.safety_data_sheet}>
                    <button class="details-btn">View details</button>
                </a>
            `; 
            
            
            // "View details" will be filled with link .../Chemical-Register-OHTUII/chemical-card.html?id={chemical.id}, so chemical card page will fill dynamically using
            // the correct chemicals information.
            // Chemical card page will have its own fetch function using the url:s id to fetch correct chemicals information.

            
            // Create pictograms container, which loads all pictograms to the list (Jarre)
            const pictogramContainer = divItem.querySelector(".pictograms");

            chemical.pictograms.forEach(path =>{
                const img = document.createElement("img");
                img.src = path;
                img.width = 75;
                img.height = 75;
                pictogramContainer.appendChild(img);
            })

            chemicalSection.appendChild(divItem);

            console.log(chemical.name);
            console.log(chemical.formula);
        });
    }
});