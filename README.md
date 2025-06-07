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

1. Go to this site and find your Pokémon’s sprite:
