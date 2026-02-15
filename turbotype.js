const words =
  "time year people way day man thing woman life child world school state family student group country problem hand part place case week company system program question work government number night point home water room mother area money story fact month lot right study book eye job word business issue side kind head house service friend father power hour game line end member law car city community name president team minute idea kid body information back parent face others level office door health person art war history party result change morning reason research girl guy food moment air teacher force education foot boy age policy process music market sense nation plan college interest death experience effect use class control care field role effort rate heart drug show leader light voice wife police mind price report decision son view relationship town road arm difference thank building value drive stage society  unit paper bottom hell to sit cat run sky red blue jump fast slow tree rock sand fire wind rain snow sun moon star cloud sea ship car bus train plane road map pen cup book lamp desk door wall floor roof glass plate spoon fork knife rice milk tea sugar salt bread fruit grape mango peach lemon berry apple chair table phone watch clock light dark smile laugh cry dream think build break grow plant leaf root stem river lake hill field grass stone brick metal gold silver copper iron steel silk wool cotton paper ink paint brush sound music song drum flute piano guitar violin dance sing shout whisper talk speak write read code pixel byte chip wire screen mouse keyboard touch swipe click scroll drag drop load save print send call text mail post link file folder drive data logic array loop stack queue hash node graph tree leaf branch seed bloom petal thorn shell wave tide foam mist dust smoke spark flame frost chill heat warm cool sharp blunt soft hard smooth rough clean dirty sweet bitter sour spicy mild fresh stale young old new ancient modern rapid quiet loud bright dim empty full open close begin end finish start stop push pull lift drop rise fall twist turn fold bend shake roll slide crawl climb float sink hover glide sprint walk hop skip dive swim blink stare gaze glance point mark trace chase catch throw grab hold press tap snap crack split merge mix stir boil bake fry roast steam freeze melt carve mold shape craft forge weave knit sew stitch cut paste glue tape wrap pack stack pile heap mound slope curve angle circle square cube sphere prism cone oval line dot dash flash blink glow shine sparkle flicker ripple echo pulse rhythm tempo chord note lyric verse prose story myth legend fable tale saga quest hero villain giant dwarf elf fairy dragon tiger lion zebra panda koala otter eagle hawk falcon raven crow sparrow robin swan goose duck whale shark squid crab lobster coral reef canyon desert forest jungle meadow prairie tundra island coast harbor valley plateau summit peak cliff ridge bridge tower castle palace temple shrine market plaza avenue alley garden orchard vineyard bakery cafe diner hotel motel cabin lodge studio theater cinema museum gallery library campus school college office clinic hospital lab factory studio studiox orbit comet meteor asteroid galaxy nebula cosmos quantum atom proton neutron electron photon plasma crystal prism mirror shadow spirit ghost angel demon oracle cipher puzzle riddle secret codeword random swift agile nimble brisk calm eager keen bold brave proud shy humble noble clever witty silly quirky zany fuzzy cozy chilly breezy stormy sunny rainy snowy dusty muddy rocky sandy grassy leafy woody salty sugary creamy crispy crunchy chewy spicy smoky tangy zesty juicy bitterly oddly madly gladly truly purely barely nearly softly loudly quickly slowly deeply highly mostly rarely often always never maybe perhaps surely simply neatly plainly tightly loosely widely broadly sharply faintly roughly exactly precisely vaguely kindly gently warmly coldly brightly dimly briefly mostly lastly firstly secondly thirdly onward upward downward inward outward beyond above below across around between among beside inside outside toward against despite within without before after during while until since unless although because therefore however moreover likewise meanwhile somehow anyway anywayx alpha beta gamma delta epsilon zeta theta iota kappa lambda mu nu xi omicron pi rho sigma tau upsilon phi chi psi omega quartz marble granite basalt slate chalk clay soil earth water fire air ether north south east west center middle edge corner border frame panel layer level phase stage grade rank class group team squad crew tribe clan guild league union pact bond link chain rope thread fiber strand cable cord beam ray wave particle field force power energy charge flux pulse spark drift swirl spiral vortex current stream brook creek pond bay gulf strait cape dune bluff knoll ridgepath footstep pathway walkway highway byway subway runway gateway doorway hallway stair ladder elevator tunnel chamber vault cellar attic balcony porch patio terrace courtyard backyard frontyard sandbox toolbox mailbox suitcase briefcase backpack satchel wallet purse pocket sleeve collar button zipper buckle strap handle knob hinge latch bolt screw nail pin clip clamp hook ring loop knot braid twist whirl spin flip flop tick tock hum buzz hiss clang crash smash splash dash rush hush blush crush brush blushx maple cedar pine birch oak elm ash fir spruce palm cactus ivy moss fern reed lily lotus rose tulip daisy orchid jasmine violet iris sunflower butter honey syrup nectar cocoa vanilla pepper cinnamon clove ginger garlic onion carrot potato tomato peppercorn chili basil thyme parsley mint sage rosemary oregano cumin curry saffron almond peanut walnut cashew pistachio hazelnut coconut sesame pumpkin melon kiwi papaya guava plum cherry fig date apricot raisin barley wheat oats rye millet quinoa lentil bean pea corn ricegrain flour dough batter crust crumb slice piece chunk shard flake chip crumbx crumbly silky velvety glossy matte shiny opaque clear transparent solid liquid gas vapor plasmawave micro nano pico femto giga tera mega kilo bytebit pixelate render animate simulate generate calculate evaluate integrate differentiate simplify amplify modify verify certify clarify notify identify justify multiply divide subtract add sum total prime even odd zero one two three four five six seven eight nine ten hundred thousand million billion trillion tiny small large giant massive minor major equal randomize shuffle select choose pick sort filter search match align center justify compress expand encode decode encrypt decrypt upload download install update upgrade downgrade reboot restart refresh reload execute compile debug test deploy commit branch merge fork clone build run ".split(
    " ",
  );

// GAME STATE

let currentLetterIndex = 0;
let currentWordIndex = 0;
let gameStarted = false;
let gameEnded = false;
let startTime = null;
let timerInterval = null;
let gameMode = "time";
let timeLimit = 30;
let wordLimit = 25;

let stats = {
  correctChars: 0,
  incorrectChars: 0,
  extraChars: 0,
  totalTyped: 0,
  correctWords: 0,
  incorrectWords: 0,
  wpmHistory: [],
};

// FUNCTIONS

function formatWord(word) {
  return `<div class="word">
    ${word
      .split("")
      .map((char) => `<span class="letter">${char}</span>`)
      .join("")}
  </div>`;
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function generateWords(count) {
  let html = "";
  for (let i = 0; i < count; i++) {
    html += formatWord(getRandomWord());
  }
  return html;
}

// CALCULATIONS

function calculateWPM() {
  if (!startTime) return 0;
  const minutes = (Date.now() - startTime) / 1000 / 60;
  if (minutes === 0) return 0;
  return Math.round(stats.correctChars / 5 / minutes);
}

function calculateRawWPM() {
  if (!startTime) return 0;
  const minutes = (Date.now() - startTime) / 1000 / 60;
  if (minutes === 0) return 0;
  return Math.round(stats.totalTyped / 5 / minutes);
}

function calculateAccuracy() {
  if (stats.totalTyped === 0) return 100;
  return Math.round((stats.correctChars / stats.totalTyped) * 100);
}

function updateDisplay() {
  const wpm = calculateWPM();
  const accuracy = calculateAccuracy();

  document.getElementById("wpm").textContent = wpm;
  document.getElementById("accuracy").textContent = accuracy + "%";
  document.getElementById("errors").textContent =
    stats.incorrectChars + stats.extraChars;

  if (gameMode === "words") {
    document.getElementById("timer").textContent =
      currentWordIndex + "/" + wordLimit;
  }
}

// GAME CONTROL

function startGame() {
  gameStarted = true;
  gameEnded = false;
  startTime = Date.now();
  document.getElementById("words").style.filter = "blur(0px)";
  document.getElementById("start").style.display = "none";

  if (gameMode === "time") {
    startTimer();
  }

  updateDisplay();
}

function startTimer() {
  let remaining = timeLimit;
  document.getElementById("timer").textContent = remaining;

  timerInterval = setInterval(() => {
    remaining--;
    document.getElementById("timer").textContent = remaining;

    if (remaining <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameEnded = true;
  clearInterval(timerInterval);
  document.getElementById("game").style.height = "100vh";

  const wpm = calculateWPM();
  const rawWPM = calculateRawWPM();
  const accuracy = calculateAccuracy();

  // Mark any incomplete word as incorrect
  const allWords = document.querySelectorAll(".word");
  if (currentWordIndex < allWords.length) {
    const currentWord = allWords[currentWordIndex];
    const letters = currentWord.querySelectorAll(".letter");

    // Check if word was started but not completed
    if (currentLetterIndex > 0) {
      stats.incorrectWords++;
      for (let i = currentLetterIndex; i < letters.length; i++) {
        if (
          !letters[i].classList.contains("correct") &&
          !letters[i].classList.contains("incorrect")
        ) {
          letters[i].classList.add("incorrect");
        }
      }
    }
  }

  showResults(wpm, rawWPM, accuracy);
}

function showResults(wpm, rawWPM, accuracy) {
  const resultsHTML = `
    <div class="results">
      <h2>Test Complete!</h2>
      <div class="result-grid">
        <div class="result-item">
          <div class="result-label">WPM</div>
          <div class="result-value">${wpm}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Raw WPM</div>
          <div class="result-value">${rawWPM}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Accuracy</div>
          <div class="result-value">${accuracy}%</div>
        </div>
        <div class="result-item">
          <div class="result-label">Correct Characters</div>
          <div class="result-value">${stats.correctChars}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Incorrect Characters</div>
          <div class="result-value">${stats.incorrectChars}</div>
        </div>
        <div class="result-item">
          <div class="result-label">Extra Characters</div>
          <div class="result-value">${stats.extraChars}</div>
        </div>
      </div>
      <button onclick="resetGame()" class="restart-btn">Try Again</button>
    </div>
  `;

  document.getElementById("game").innerHTML = resultsHTML;
}

function resetGame() {
  // Reset all state
  currentLetterIndex = 0;
  currentWordIndex = 0;
  gameStarted = false;
  gameEnded = false;
  startTime = null;
  clearInterval(timerInterval);

  stats = {
    correctChars: 0,
    incorrectChars: 0,
    extraChars: 0,
    totalTyped: 0,
    correctWords: 0,
    incorrectWords: 0,
    wpmHistory: [],
  };

  setupGame();
}

function setupGame() {
  document.getElementById("game").style.height = "150px";
  const wordCount = gameMode === "words" ? wordLimit : 100;

  document.getElementById("game").innerHTML = `
    <div id="words">${generateWords(wordCount)}</div>
    <span id="start">Click to start or press any key</span>
  `;

  document.getElementById("words").style.filter = "blur(5px)";
  document.getElementById("start").style.display = "block";

  document.getElementById("wpm").textContent = "0";
  document.getElementById("accuracy").textContent = "100%";
  document.getElementById("errors").textContent = "0";

  if (gameMode === "time") {
    document.getElementById("timer").textContent = timeLimit;
  } else {
    document.getElementById("timer").textContent = "0/" + wordLimit;
  }

  updateCursor();
}

function updateCursor() {
  // Remove old cursor
  const oldCursor = document.querySelector(".cursor");
  if (oldCursor) oldCursor.remove();

  if (gameEnded) return;

  const allWords = document.querySelectorAll(".word");
  if (currentWordIndex >= allWords.length) return;

  const currentWord = allWords[currentWordIndex];
  const letters = currentWord.querySelectorAll(".letter:not(.extra)");

  let targetLetter;
  if (currentLetterIndex < letters.length) {
    targetLetter = letters[currentLetterIndex];
  } else {
    targetLetter = letters[letters.length - 1];
  }

  if (targetLetter) {
    const cursor = document.createElement("div");
    cursor.className = "cursor";
    targetLetter.appendChild(cursor);
  }
}

// MODE SWITCHING

function setTimeMode(seconds) {
  gameMode = "time";
  timeLimit = seconds;
  document
    .querySelectorAll(".time-btn")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");
  document
    .querySelectorAll(".word-btn")
    .forEach((btn) => btn.classList.remove("active"));
  resetGame();
}

function setWordMode(wordCount) {
  gameMode = "words";
  wordLimit = wordCount;
  document
    .querySelectorAll(".word-btn")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");
  document
    .querySelectorAll(".time-btn")
    .forEach((btn) => btn.classList.remove("active"));
  resetGame();
}

document.addEventListener("keydown", (e) => {
  // Ignore function keys and special keys except space and backspace
  if (e.key.length > 1 && e.key !== " " && e.key !== "Backspace") return;

  // Start game on first keypress
  if (!gameStarted && !gameEnded) {
    startGame();
  }

  if (gameEnded) return;

  const key = e.key;
  const allWords = document.querySelectorAll(".word");

  if (currentWordIndex >= allWords.length) {
    if (gameMode === "words") {
      endGame();
    } else {
      document.getElementById("words").innerHTML += generateWords(50);
    }
    return;
  }

  const currentWord = allWords[currentWordIndex];
  const letters = currentWord.querySelectorAll(".letter:not(.extra)");

  if (key === "Backspace") {
    e.preventDefault();

    const extraLetters = currentWord.querySelectorAll(".extra");
    if (extraLetters.length > 0) {
      extraLetters[extraLetters.length - 1].remove();
      stats.extraChars--;
      stats.totalTyped--;
    } else if (currentLetterIndex > 0) {
      currentLetterIndex--;
      const letter = letters[currentLetterIndex];

      if (letter.classList.contains("correct")) {
        stats.correctChars--;
      } else if (letter.classList.contains("incorrect")) {
        stats.incorrectChars--;
      }

      letter.classList.remove("correct", "incorrect");
      stats.totalTyped--;
    } else if (currentWordIndex > 0) {
      currentWordIndex--;
      const prevWord = allWords[currentWordIndex];
      const prevLetters = prevWord.querySelectorAll(".letter:not(.extra)");
      currentLetterIndex = prevLetters.length;

      const prevExtras = prevWord.querySelectorAll(".extra");
      prevExtras.forEach((extra) => {
        extra.remove();
        stats.extraChars--;
        stats.totalTyped--;
      });
    }

    updateCursor();
    updateDisplay();
    return;
  }

  stats.totalTyped++;

  if (currentLetterIndex < letters.length) {
    const expectedLetter = letters[currentLetterIndex];

    if (key === " ") {
      // Space pressed early - mark remaining letters as incorrect
      for (let i = currentLetterIndex; i < letters.length; i++) {
        if (
          !letters[i].classList.contains("correct") &&
          !letters[i].classList.contains("incorrect")
        ) {
          letters[i].classList.add("incorrect");
          stats.incorrectChars++;
          stats.totalTyped++;
        }
      }
      stats.incorrectWords++;
      currentWordIndex++;
      currentLetterIndex = 0;

      // Check if test is complete
      if (gameMode === "words" && currentWordIndex >= wordLimit) {
        endGame();
        return;
      }
    } else if (key === expectedLetter.textContent) {
      expectedLetter.classList.add("correct");
      stats.correctChars++;
      currentLetterIndex++;

      // Check if word is complete
      if (currentLetterIndex === letters.length) {
        stats.correctWords++;
      }
    } else {
      expectedLetter.classList.add("incorrect");
      stats.incorrectChars++;
      currentLetterIndex++;
    }
  }
  // After word (expecting space)
  else {
    if (key === " ") {
      currentWordIndex++;
      currentLetterIndex = 0;

      // Check if test is complete
      if (gameMode === "words" && currentWordIndex >= wordLimit) {
        endGame();
        return;
      }
    } else {
      // extra character
      const extraLetter = document.createElement("span");
      extraLetter.classList.add("letter", "incorrect", "extra");
      extraLetter.textContent = key;
      currentWord.appendChild(extraLetter);
      stats.extraChars++;
    }
  }

  updateCursor();
  updateDisplay();
});

document.getElementById("game").addEventListener("click", () => {
  if (!gameStarted && !gameEnded) {
    startGame();
  }
});

document.getElementById("new").addEventListener("click", resetGame);
setupGame();
