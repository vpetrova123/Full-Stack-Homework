/** Exercise 03 - Form **/

// Add your code here
document.querySelector("form").addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const checkbox = document.getElementById("newsletter").checked;

  console.log(`Name: ${username}`);
  console.log(`Email: ${email}`);
  if (message === "") {
    console.log("Feedback: No feedback was submitted.");
  } else {
    console.log(`Feedback: ${message}`);
  }
  if (checkbox) {
    console.log("Newsletter: Yes I would like to join the newsletter.");
  } else {
    console.log("Newsletter: No thank you.");
  }
}
