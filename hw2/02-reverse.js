/** Exercise 02 - Reverse **/
// Add your code here

//Save all necessary elements from the DOM as variables
const main = document.querySelector("main");
const userInput = document.querySelector("#input");
const reverse = document.querySelector("#reverse");

//Add and style a div for the output
const outputDiv = document.createElement("div");
outputDiv.setAttribute("id", "output");
outputDiv.style.marginTop = "20px";
outputDiv.style.marginBottom = "5px";
main.append(outputDiv);

//Add an event listener
reverse.addEventListener("click", handleClick);

//Implement the callback function
function handleClick(event) {
  if (userInput.value.length !== 8) {
    outputDiv.style.color = "red";
    outputDiv.textContent = "Error: Please input an 8-digit number";
  } else {
    const reverseInput = userInput.value.split("").reverse().join("");
    outputDiv.style.color = "green";
    outputDiv.textContent = userInput.value + " --> " + reverseInput;
  }
}
