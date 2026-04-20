

// Get id from url
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

// Fetch chemicals
const chemicalList = await fetchChemicals();
const chemical = chemicalList.find(c => c.id === id);


// Fill the chemical card with chemicals information

// Name
document.getElementById("chemicalName").textContent = chemical.name;

// Chemical formula
document.getElementById("chemicalFormula").textContent = chemical.formula;
document.getElementById("chemicalImage").src = `https://cactus.nci.nih.gov/chemical/structure/${chemical.CAS}/image`;

// Use purpose
document.getElementById("chemicalUsePurpose").textContent = chemical.use_purpose;

// Storage
document.getElementById("chemicalStorage").textContent = chemical.storage;

// H-phrases
const ulH = document.getElementById("chemicalHPhrases");

chemical.h_phrases.forEach((hCode, index) => {
  const desc = chemical.h_phrase_desc[index];

  const li = document.createElement("li");
  li.textContent = `${hCode}: ${desc}`;

  ulH.appendChild(li);
});

// P-phrases

const ulP = document.getElementById("chemicalPPhrases");

chemical.p_phrases.forEach((pCode, index) => {
  const desc = chemical.p_phrase_desc[index];

  const li = document.createElement("li");
  li.textContent = `${pCode}: ${desc}`;

  ulP.appendChild(li);
});

// Pictograms

const ulPic = document.getElementById("chemicalPictograms");

chemical.pictograms.forEach((path) => {
  const img = document.createElement("img");
  img.src = path;
  img.width = 75;
  img.height = 75;

  ulPic.appendChild(img);
});

// First aid

// Inhaled
if(chemical.inhaled != ""){
    const li = document.createElement("li");
    li.textContent = "If chemical has been inhaled: " + chemical.inhaled;
    document.getElementById("chemicalFirstAid").appendChild(li);
}
// Digested
if(chemical.digested != ""){
    const li = document.createElement("li");
    li.textContent = "If chemical has been digested: " + chemical.digested;
    document.getElementById("chemicalFirstAid").appendChild(li);
}
// On skin
if(chemical.on_skin != ""){
    const li = document.createElement("li");
    li.textContent = "If chemical has gotten onto the skin: " + chemical.on_skin;
    document.getElementById("chemicalFirstAid").appendChild(li);
}
// On eyes

if(chemical.on_eys != ""){
    const li = document.createElement("li");
    li.textContent = "If chemical has gotten into the eyes: " + chemical.on_eyes;
    document.getElementById("chemicalFirstAid").appendChild(li);
}

// Safety Data Sheet
document.getElementById("chemicalSDS").href = chemical.safety_data_sheet;

// Supplier
const supplier = document.createElement("p");
supplier.textContent = chemical.supplier;
document.getElementById("chemicalSupplier").appendChild(supplier);