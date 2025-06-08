
// ... existing JS logic (you should include full code here in production)

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
  reader.onload = function(e) {
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
