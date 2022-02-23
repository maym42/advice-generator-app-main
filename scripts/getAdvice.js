/*html elemnts */
let btnDice = document.getElementsByClassName("btnDice")[0];
let adviceNumberElement = document.getElementById("adviceID");
let adviceTextElement = document.getElementById("adviceText");

/*instruction*/
let instructionText =
  "Generate a new piece of advice by clicking the dice icon!";

/*events */
window.addEventListener("load", function () {
  insertNewAdviceToElments("", instructionText);
});

/* btn click */
btnDice.addEventListener("click", function () {
  getNewAdvice();
});

/*methods*/
function getNewAdvice() {
  let randomNum = Math.floor(Math.random() * 99) + 1;
  let numId, adviceText;
  adviceTextElement.setAttribute("class", "opacity0");
  adviceNumberElement.setAttribute("class", "opacity0");
  fetch("https://api.adviceslip.com/advice/" + randomNum)
    .then((response) => response.json())
    .then(function (data) {
      try {
        numId = data.slip.id;
        adviceText = `&#8220;${data.slip.advice}&#8221`;
        insertNewAdviceToElments(numId, adviceText);
      } catch (exc) {
        console.log(exc);
        getNewAdvice();
      }
    });
}

/* insert advice text to html */
function insertNewAdviceToElments(numId, adviceText) {
  adviceNumberElement.innerText = "Advice #" + numId;
  adviceTextElement.innerHTML = adviceText;
  adviceNumberElement.setAttribute("class", "transitionOpacity1");
  adviceTextElement.setAttribute("class", "transitionOpacity1");
}
