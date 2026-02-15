# Minimalist Typing Speed Test

A lightweight, vanilla JavaScript typing test engine inspired by Monkeytype. This project measures typing speed (WPM) and accuracy using a sleek, distraction-free interface.

## 🧠 Technical Approach & Philosophy

The goal was to create a high-performance typing test without the overhead of heavy frameworks like React or Vue, while maintaining granular control over every character rendered.

### 1. Architecture: DOM-First vs. State-First
I utilized a hybrid approach. While there is a global `stats` object to track metrics (correct chars, errors, start time), the **DOM serves as the visual source of truth** for the current word and letter positions.
- **Why?** This avoids the complexity of syncing a virtual string state with the visual representation. We simply query the active letter element and style it directly based on user input.

### 2. The Input Mechanism
Instead of using a hidden `<input>` or `<textarea>` element (which can cause cursor sync issues), the application listens to global `keydown` events.
- **Filtering:** We filter out function keys, allowing only single-character inputs and specific control keys (Backspace, Space).
- **Validation:** On every keystroke, the key is compared against the `textContent` of the current active letter DOM node.

### 3. Visual Rendering Strategy
To achieve the specific visual style (where individual letters turn green/red):
- **Granularity:** The text isn't a single string. It is generated as a tree of `<div class="word">` elements containing `<span class="letter">` elements.
- **Classes:** State changes are visualised purely by toggling CSS classes: `.correct`, `.incorrect`, and `.active`.

### 4. Metrics Calculation
- **WPM (Words Per Minute):** Calculated using the standard formula: `((Correct Characters / 5) / Time Elapsed in Minutes)`. This ensures that typing "a" counts the same as typing "z", standardizing word length to 5 characters.
- **Raw WPM:** Calculated using *total* characters typed (including backspaced ones) to show physical typing speed vs. actual output speed.

---

## 🛠 Features

* **Two Game Modes:**
    * **Time Mode:** Race against the clock (standard).
    * **Word Mode:** Type a fixed amount of words as fast as possible.
* **Dynamic Cursor:** A custom DOM-based cursor that flows naturally between letters and handles line jumps.
* **Error Handling:**
    * Tracks "Extra" characters (when typing past the end of a word).
    * Highlights missed characters in red.
* **Smart Backspace:** logic handles deleting extra characters first, then moving back to previous letters, and even jumping back to previous words.
* **Live Statistics:** Real-time updates for WPM and Accuracy.

---

// Tracks performance metrics
let stats = {
  correctChars: 0,
  incorrectChars: 0,
  wpmHistory: [],
  // ...
};
