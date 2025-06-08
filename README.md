# ✨ Shiny Hunting Counter

A customizable, multi-hunt shiny Pokémon tracker built in pure HTML/CSS/JavaScript.  
Track shiny progress across different games and methods, store hunt data locally, and use animated shiny GIFs for a smooth experience.

![Demo Preview](assets/demo.gif) <!-- Optional: replace with actual demo GIF -->

---

## 📦 Features

- 🎯 **Multiple Concurrent Hunts**  
  Each hunt has its own image, counter, method, game, and completion status.

- 🎮 **Game & Method Selection**  
  Choose your hunting game from a dropdown covering **Gen 3 to Gen 9**  
  Add your own method (e.g. Masuda, Outbreak, SOS, Full Odds)

- 🖼 **Animated Shiny GIF Support**  
  Import your own `.gif` sprites into the `/assets` folder and reference them in hunts.

- 🔢 **Live Counter with Keyboard Support**  
  - Press `Spacebar` to +1 the encounter count  
  - Manually edit counts with a number input  
  - Save or reset any hunt  
  - Mark hunts as ✅ completed

- 🎨 **Color-Coded Generations**  
  Each hunt has a left border color matching the generation of the selected game (e.g. Gen 3 = orange, Gen 8 = yellow)

- 💾 **Persistent Data Storage**  
  All hunts are stored in your browser using `localStorage`

---

## 🔧 How to Import Shiny GIF Sprites

To import shiny sprites into the `/assets` folder:

Go to this site and find your Pokémon’s sprite: https://www.shinyhunters.com/images/shiny/319.gif --> replace "319" with pokedex number of pokemon you're hunting

## 🔁 Exporting & Importing Hunts (Cross-Device Manual Sync)

You can now save and load your shiny hunt data between devices!

### 📤 Export Hunts

1. Click the **📤 Export Hunts** button on the tracker page
2. A file named `shiny-hunts.json` will download to your device
3. Save it somewhere safe (e.g. iCloud, Google Drive, Downloads)

### 📥 Import Hunts

1. On another device (or after resetting your browser), open the tracker
2. Click **📥 Import Hunts**
3. Choose your previously saved `shiny-hunts.json` file
4. Your hunts will be restored!

✅ This works across phones, tablets, and PCs  
✅ Keeps all your count, game, method, and completion status  
❌ Note: this doesn't auto-sync — it's a manual backup/restore system

---

### 💾 Recommended Storage Tips

- **Mobile users (iOS/Android):** save to Files app, Downloads, or Google Drive
- **PC users:** any folder works — just remember where you saved it
- Want to keep multiple backups? Rename the file like `shiny-hunts_2025-06-08.json`

## 🧑‍💻 Credits ## 

Built by Aviral Jain, inspired by the real shiny hunting grind!

Sprites from:

- shinyhunters.com

- Pokémon Database
