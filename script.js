let colorSample = null; //The color sample element
let answers = []; //Array of answer elements
let correctColorCode = null; //Colour code of actual colour sample
let score = 0; //Number of correct answers
let total = 10; //Total number of questions
let questionCount = 0;
let difficulty = 8;
let mode = 0;

function codeMode() {
  mode = 0;
  document.getElementById("modeSelect").style.display = "none";
}

function colorMode() {
  mode = 1;
  document.getElementById("modeSelect").style.display = "none";
}

function easyMode() {
  difficulty = 2;
  setDifficulty();
  document.getElementById("difSelect").style.display = "none";
}

function mediumMode() {
  difficulty = 4;
  setDifficulty();
  document.getElementById("difSelect").style.display = "none";
}

function hardMode() {
  difficulty = 8;
  setDifficulty();
  document.getElementById("difSelect").style.display = "none";
}

function reload() {
  location.reload();
}

function setDifficulty() {
  if (difficulty > 4) {
    let row = document.createElement("div");
    let col1 = document.createElement("div");
    let col2 = document.createElement("div");
    row.className = "row";
    row.id = "row";
    col1.className = "column";
    col1.id = "col1";
    col2.className = "column";
    col2.id = "col2";

    document.getElementById("answers").appendChild(row);
    document.getElementById("row").appendChild(col1);
    document.getElementById("row").appendChild(col2);
  } //if

  for (let i = 0; i < difficulty; i++) {
    let tempAns = document.createElement("div");
    tempAns.className = "answer";
    switch (i) {
      case 0:
        tempAns.id = "a";
        break;
      case 1:
        tempAns.id = "b";
        break;
      case 2:
        tempAns.id = "c";
        break;
      case 3:
        tempAns.id = "d";
        break;
      case 4:
        tempAns.id = "e";
        break;
      case 5:
        tempAns.id = "f";
        break;
      case 6:
        tempAns.id = "g";
        break;
      case 7:
        tempAns.id = "h";
        break;
    } //switch

    if (difficulty > 4) {
      tempAns.style.width = "220px";
      tempAns.style.height = "25px";
      if (i >= 0 && i < 4) {
        document.getElementById("col1").appendChild(tempAns);
      } else {
        document.getElementById("col2").appendChild(tempAns);
      } //else
    } else {
      document.getElementById("answers").appendChild(tempAns);
    } //else
    answers.push(tempAns);
  } //for

  document.getElementById("score").innerHTML = 0 + " / " + total;

  for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener("click", function () {
      markIt(this);
    });
  } //for

  loadNewQuestion();
} //setDifficulty

//Initialize page elements
window.onload = function () {
  document.getElementById("endScreen").style.display = "none";
  colorSample = document.getElementById("colorSample");
}; //onload

function markIt(elem) {
  let gotItRight = false;

  if (mode > 0) {
    console.log(
      "Comparing " +
        convertRGB(elem.style.backgroundColor) +
        " to " +
        correctColorCode
    );

    if (convertRGB(elem.style.backgroundColor) == correctColorCode) {
      score++;
      gotItRight = true;
    } //if
  } else {
    console.log("Comparing " + elem.innerHTML + " to " + correctColorCode);

    if (elem.innerHTML == correctColorCode) {
      score++;
      gotItRight = true;
    } //if
  }

  document.getElementById("score").innerHTML = score + " / " + total;

  window.setTimeout(function () {
    if (gotItRight) {
      colorSample.innerHTML = "Correct!";
    } else {
      if (mode > 0) {
        for (let i = 0; i < answers.length; i++) {
          if (
            convertRGB(answers[i].style.backgroundColor) == correctColorCode
          ) {
            answers[i].innerHTML = colorSample.innerHTML;
          }
        }
      } else {
        for (let i = 0; i < answers.length; i++) {
          if (answers[i].innerHTML == correctColorCode) {
            answers[i].style.backgroundColor = correctColorCode;
          }
        }
      }

      colorSample.innerHTML = "Incorrect!";
    } //else
  }, 100);

  window.setTimeout(function () {
    loadNewQuestion();
  }, 1300);
} //markIt

function loadNewQuestion() {
  questionCount++;
  console.log(questionCount);

  if (questionCount > 10) {
    document.getElementById("endScreen").style.display = "block";
    document.getElementById("scoreDis").innerHTML =
      "Your score was " +
      score +
      " / " +
      total +
      ". Would you like to play again?";
  }

  let colorCode = getRandomHexCode();
  let solution = Math.floor(Math.random() * difficulty);

  if (mode > 0) {
    colorSample.innerHTML = "";
    colorSample.innerHTML = colorCode;
    for (let i = 0; i < answers.length; i++) {
      answers[i].innerHTML = "";
    }

    for (let i = 0; i < answers.length; i++) {
      if (i == solution) {
        answers[i].style.backgroundColor = colorCode;
      } else {
        answers[i].style.backgroundColor = getRandomHexCode();
      } //else
    } //for
  } else {
    colorSample.innerHTML = "";
    colorSample.style.backgroundColor = colorCode;
    for (let i = 0; i < answers.length; i++) {
      answers[i].style.backgroundColor = "transparent";
    }

    for (let i = 0; i < answers.length; i++) {
      if (i == solution) {
        answers[i].innerHTML = colorCode;
      } else {
        answers[i].innerHTML = getRandomHexCode();
      } //else
    } //for
  }

  correctColorCode = colorCode;
} //loadNewQuestion

function convertRGB(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  function hexCode(i) {
    return ("0" + parseInt(i).toString(16)).slice(-2);
  }
  return "#" + hexCode(rgb[1]) + hexCode(rgb[2]) + hexCode(rgb[3]);
}

function getRandomHexCode() {
  let result = [];
  let hexRef = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];

  result.push("#");

  for (let n = 0; n < 6; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  } //for

  return result.join("");
} //getRandomHexCode

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
