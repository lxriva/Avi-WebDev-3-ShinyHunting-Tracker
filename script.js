
const gameList = [
  "Ruby", "Sapphire", "Emerald", "FireRed", "LeafGreen",
  "Diamond", "Pearl", "Platinum", "HeartGold", "SoulSilver",
  "Black", "White", "Black 2", "White 2",
  "X", "Y", "Omega Ruby", "Alpha Sapphire",
  "Sun", "Moon", "Ultra Sun", "Ultra Moon",
  "Let's Go Pikachu", "Let's Go Eevee",
  "Sword", "Shield", "Brilliant Diamond", "Shining Pearl",
  "Legends Arceus", "Scarlet", "Violet"
];

const gameGenerations = {
  "Ruby": "gen3", "Sapphire": "gen3", "Emerald": "gen3", "FireRed": "gen3", "LeafGreen": "gen3",
  "Diamond": "gen4", "Pearl": "gen4", "Platinum": "gen4", "HeartGold": "gen4", "SoulSilver": "gen4",
  "Black": "gen5", "White": "gen5", "Black 2": "gen5", "White 2": "gen5",
  "X": "gen6", "Y": "gen6", "Omega Ruby": "gen6", "Alpha Sapphire": "gen6",
  "Sun": "gen7", "Moon": "gen7", "Ultra Sun": "gen7", "Ultra Moon": "gen7",
  "Let's Go Pikachu": "gen8", "Let's Go Eevee": "gen8",
  "Sword": "gen8", "Shield": "gen8", "Brilliant Diamond": "gen8", "Shining Pearl": "gen8", "Legends Arceus": "gen8",
  "Scarlet": "gen9", "Violet": "gen9"
};

const hunts = JSON.parse(localStorage.getItem("shinyHunts")) || [];
let currentIndex = 0;

// Upgrade old hunts
hunts.forEach(h => {
  if (!("game" in h)) h.game = "Unknown";
  if (!("method" in h)) h.method = "Unknown";
  if (!("completed" in h)) h.completed = false;
});
saveHunts();

function saveHunts() {
  localStorage.setItem("shinyHunts", JSON.stringify(hunts));
}

// Populate the game <select>
const gameSelect = document.getElementById("game-select");
gameList.forEach(game => {
  const option = document.createElement("option");
  option.value = game;
  option.textContent = game;
  gameSelect.appendChild(option);
});

const selector = document.getElementById("hunt-selector");
const selectedHuntView = document.getElementById("selected-hunt-view");

function renderSelector() {
  selector.innerHTML = "";
  hunts.forEach((hunt, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = hunt.name;
    selector.appendChild(option);
  });
  selector.value = currentIndex;
}

function renderSelectedHunt() {
  selectedHuntView.innerHTML = "";
  if (hunts.length === 0) {
    selectedHuntView.innerHTML = "<p>No shiny hunts yet. Add one to begin!</p>";
    return;
  }

  const hunt = hunts[currentIndex];
  const container = document.createElement("div");
  const genClass = gameGenerations[hunt.game] || "";
  const doneClass = hunt.completed ? "completed" : "";
  container.className = `hunt ${genClass} ${doneClass}`;

  container.innerHTML = `
    <img src="assets/${hunt.image}" alt="${hunt.name}" onerror="this.onerror=null;this.src='assets/fallback.gif';">
    <div>
      <h2>${hunt.name}</h2>
      <label>
        <strong>Encounters:</strong>
        <input type="number" value="${hunt.count}" min="0" id="edit-count" style="width: 80px;">
      </label>
      <button onclick="saveEditedCount()">Save</button>
      <p><strong>Game:</strong> ${hunt.game}</p>
      <p><strong>Method:</strong> ${hunt.method}</p>
      <p>
        <label>
          <input type="checkbox" id="complete-toggle" ${hunt.completed ? "checked" : ""}>
          ✅ Hunt Completed
        </label>
      </p>
      <div class="counter-controls">
        <button onclick="increment()">+1</button>
        <button onclick="reset()">Reset</button>
        <button onclick="deleteCurrent()">Delete</button>
      </div>
    </div>
  `;

  selectedHuntView.appendChild(container);

  document.getElementById("complete-toggle").addEventListener("change", (e) => {
    hunts[currentIndex].completed = e.target.checked;
    saveHunts();
    renderSelectedHunt();
  });
}

function increment() {
  hunts[currentIndex].count++;
  saveHunts();
  renderSelectedHunt();
}

function decrement() {
  hunts[currentIndex].count--;
  saveHunts();
  renderSelectedHunt();
 }
function reset() {
  hunts[currentIndex].count = 0;
  saveHunts();
  renderSelectedHunt();
}

function deleteCurrent() {
  if (confirm(`Delete hunt for ${hunts[currentIndex].name}?`)) {
    hunts.splice(currentIndex, 1);
    currentIndex = 0;
    saveHunts();
    renderSelector();
    renderSelectedHunt();
  }
}

function saveEditedCount() {
  const newVal = parseInt(document.getElementById("edit-count").value, 10);
  if (!isNaN(newVal) && newVal >= 0) {
    hunts[currentIndex].count = newVal;
    saveHunts();
    renderSelectedHunt();
  }
}

document.getElementById("add-hunt-form").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("hunt-name").value.trim();
  let image = document.getElementById("image-path").value.trim();
  const method = document.getElementById("hunt-method").value.trim();
  const game = document.getElementById("game-select").value;
  if (!image.endsWith(".gif")) image += ".gif";

  hunts.push({ name, image, method, game, count: 0, completed: false });
  currentIndex = hunts.length - 1;
  saveHunts();
  renderSelector();
  renderSelectedHunt();
  e.target.reset();
});

selector.addEventListener("change", () => {
  currentIndex = Number(selector.value);
  renderSelectedHunt();
});

document.addEventListener("keydown", (e) => {
  const isInput = document.activeElement.tagName === "INPUT";
  if (e.code === "Space" && !isInput) {
    e.preventDefault();
    increment();
  }
  else if (e.code === "Backspace" && !isInput) {
    e.preventDefault();
    decrement();
  }
});

function exportHunts() {
  const data = JSON.stringify(hunts, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "shiny-hunts.json";
  a.click();
}

function importHunts(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        imported.forEach(h => {
          if (!("game" in h)) h.game = "Unknown";
          if (!("method" in h)) h.method = "Unknown";
          if (!("completed" in h)) h.completed = false;
        });
        hunts.length = 0;
        hunts.push(...imported);
        saveHunts();
        renderSelector();
        renderSelectedHunt();
        alert("Hunts imported successfully!");
      }
    } catch (err) {
      alert("Invalid file format.");
    }
  };
  reader.readAsText(file);
}

const buttonsDiv = document.createElement("div");
buttonsDiv.style.marginTop = "1rem";
buttonsDiv.innerHTML = `
  <button onclick="exportHunts()">📤 Export Hunts</button>
  <input type="file" id="importFile" style="display:none;">
  <button onclick="document.getElementById('importFile').click()">📥 Import Hunts</button>
`;
document.body.insertBefore(buttonsDiv, document.getElementById("selected-hunt-view"));
document.getElementById("importFile").addEventListener("change", (e) => {
  importHunts(e.target.files[0]);
});

function exportHunts() {
  const data = JSON.stringify(hunts, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "shiny-hunts.json";
  a.click();
}

function importHunts(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        imported.forEach(h => {
          if (!("game" in h)) h.game = "Unknown";
          if (!("method" in h)) h.method = "Unknown";
          if (!("completed" in h)) h.completed = false;
        });
        hunts.length = 0;
        hunts.push(...imported);
        saveHunts();
        renderSelector();
        renderSelectedHunt();
        alert("Hunts imported successfully!");
      }
    } catch (err) {
      alert("Invalid file format.");
    }
  };
  reader.readAsText(file);
}

const buttonsDiv = document.createElement("div");
buttonsDiv.style.marginTop = "1rem";
buttonsDiv.innerHTML = `
  <button onclick="exportHunts()">📤 Export Hunts</button>
  <input type="file" id="importFile" style="display:none;">
  <button onclick="document.getElementById('importFile').click()">📥 Import Hunts</button>
`;
document.body.insertBefore(buttonsDiv, document.getElementById("selected-hunt-view"));
document.getElementById("importFile").addEventListener("change", (e) => {
  importHunts(e.target.files[0]);
});


renderSelector();
renderSelectedHunt();
