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

btnDice.addEventListener("click", function () {
  getNewAdvice();
});

/*methods */
function getNewAdvice() {
  let randomNum = Math.floor(Math.random() * 99) + 1;
  console.log(randomNum);
  let numId, adviceText;
  adviceTextElement.setAttribute("class", "opacity0");
  adviceNumberElement.setAttribute("class", "opacity0");
  fetch("https://api.adviceslip.com/advice/" + randomNum)
    .then((response) => response.json())
    .then(function (data) {
      try {
        console.log(data);
        numId = data.slip.id;
        adviceText = `&#8220;${data.slip.advice}&#8221`;
        insertNewAdviceToElments(numId, adviceText);
      } catch (exc) {
        console.log(exc);
        getNewAdvice();
      }
    });
}

function insertNewAdviceToElments(numId, adviceText) {
  adviceNumberElement.innerText = "Advice #" + numId;
  adviceTextElement.innerHTML = adviceText;
  adviceNumberElement.setAttribute("class", "transitionOpacity1");
  adviceTextElement.setAttribute("class", "transitionOpacity1");
}
