document.addEventListener("DOMContentLoaded", async function () {
    const logoutBtn = document.getElementById("logoutBtn");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    let allChemicals = [];
    let currentResults = [];
    let selectedIndex = -1;

    // Require session
    const session = await window.requireSession();
    if (!session) return;

    // Logout
    logoutBtn.addEventListener("click", async function () {
        await window.logoutUser();
    });

    // Load chemicals
    await useFetchedChemicals(); // Loads chemicals as unordered list (Jarre)

    // Search event
    searchInput.addEventListener("input", function () {
    const term = searchInput.value.trim().toLowerCase();

    selectedIndex = -1; // reset selection

    if (term === "") {
        searchResults.innerHTML = "";
        currentResults = [];
        return;
    }

    const matches = allChemicals.filter(c =>
        c.name.toLowerCase().includes(term)
    );

    currentResults = matches;

    renderSearchResults(matches);

});

searchInput.addEventListener("keydown", function (e) {
    if (currentResults.length === 0) return;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % currentResults.length;
        updateActiveItem();
    }

    if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
        updateActiveItem();
    }

    if (e.key === "Enter") {
        if (selectedIndex >= 0) {
            const selected = currentResults[selectedIndex];
            window.location.href = `chemicalcard.html?id=${selected.id}`;
        }
    }
});

    // Function to print chemical list into the mainpage (Jarre)
    async function useFetchedChemicals(){
        // Lets declare the section element, where we will append the chemicals
        const chemicalSection = document.getElementById("cardsContainer");

        // Array of the chemicals
        const chemicals = await fetchChemicals();

        // Store for search
        allChemicals = chemicals;

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
                <a href="chemicalcard.html?id=${chemical.id}">
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
        });
    }

    // Render search results
function renderSearchResults(results) {
    searchResults.innerHTML = "";

    if (results.length === 0) {
        searchResults.innerHTML = "<div class='search-item'>No results</div>";
        return;
    }

    results.slice(0, 10).forEach((chemical, index) => {
        const div = document.createElement("div");
        div.className = "search-item";

        div.textContent = chemical.name;

        // Click navigation
        div.addEventListener("click", function () {
            window.location.href = `chemicalcard.html?id=${chemical.id}`;
        });

        // hover to highlight item
        div.addEventListener("mouseenter", function () {
            selectedIndex = index;
            updateActiveItem();
        });

        searchResults.appendChild(div);
    });
}
function updateActiveItem() {
    const items = document.querySelectorAll(".search-item");

    items.forEach((item, index) => {
        item.classList.toggle("active", index === selectedIndex);
    });
    if (selectedIndex >= 0) {
    items[selectedIndex].scrollIntoView({
        block: "nearest"
    });
}
}

document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.innerHTML = "";
        selectedIndex = -1;
    }
});

});