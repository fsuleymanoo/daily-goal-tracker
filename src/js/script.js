// Identify and Select Needed Elements
const goalForm = document.querySelector("#goal-form");
const goalInput = document.querySelector("#goal-input");
const goalList = document.querySelector("#goal-list");
const clearAll = document.querySelector("#clear-goals-btn");

// Listeners - two arguments 1st (event type) 2nd - callback function
goalForm.addEventListener("submit", onAddGoalSubmit);
goalList.addEventListener("click", onGoalDelete);
clearAll.addEventListener("click", onClearAll);
document.addEventListener("DOMContentLoaded", displayGoals);

// Function
function displayGoals() {
  const goalsFromLocalStorage = getGoalsFromLocalStorage();
  goalsFromLocalStorage.forEach((goal) => addGoalToDOM(goal));
}

function onAddGoalSubmit(event) {
  event.preventDefault();
  const newGoal = goalInput.value;
  // add validation
  if (!goalInput.value) {
    alert("Please enter the goal!");
    return;
  }
  addGoalToDOM(newGoal);
  goalInput.value = "";
  // Add the item to local storage
  addGoalToLocalStorage(newGoal);
}

// Add remove functionality
function onGoalDelete(event) {
  // we need to make sure that user clicks on icon
  // console.log(event.target.classList.contains('fa-eraser'));
  if (event.target.classList.contains("fa-eraser")) {
    const goalText = event.target.parentElement.parentElement.innerText;

    removeGoal(event.target.parentElement.parentElement);
    // ["one", 'two', 'three', 'Complete JS Quiz'] Complete JS Quiz !== Complete JS Quiz
    const localStorageGoals = getGoalsFromLocalStorage();
    // ["one", 'two', 'three']
    const filteredGoals = localStorageGoals.filter((item) => item !== goalText);
    localStorage.setItem("goals", JSON.stringify(filteredGoals));
  }
}

// Add clear all functionality
function onClearAll() {
  // Option 1 - with while
  // while(goalList.firstChild){
  //     goalList.removeChild(goalList.firstChild);
  // }

  // Option 2- with convertion to array and for each
  Array.from(goalList.children).forEach((goal) => goal.remove());
  localStorage.clear();

  // Option 3
  //   goalList.innerHTML = '';
}

// Helper Functions
function addGoalToDOM(goal) {
  // create the list item as parent element
  const li = createListItem();
  // create the span item that contains the new goal
  // later we will append to li
  const span = createSpanElement(goal);
  li.appendChild(span);
  // create the button
  const button = createButton();
  li.appendChild(button);
  // append the newly created list to the ul
  goalList.appendChild(li);
}

function addGoalToLocalStorage(goal) {
  let goalsArray = getGoalsFromLocalStorage();
  goalsArray.push(goal);
  localStorage.setItem("goals", JSON.stringify(goalsArray));
}

function getGoalsFromLocalStorage() {
  let goalsArray;

  if (localStorage.getItem("goals") === null) {
    goalsArray = [];
  } else {
    goalsArray = JSON.parse(localStorage.getItem("goals"));
  }
  return goalsArray;
}

function removeGoal(goal) {
  if (confirm("Do you really want to remove this goal?")) {
    goal.remove();
  }
}

function createListItem() {
  const li = document.createElement("li");
  li.className = "goal-item";
  return li;
}

function createSpanElement(goalText) {
  const span = document.createElement("span");
  span.className = "goal-text";
  const textNode = document.createTextNode(goalText);
  span.appendChild(textNode);
  return span;
}

function createButton() {
  const button = document.createElement("button");
  button.className = "btn btn-delete";
  const icon = createIcon();
  button.appendChild(icon);
  return button;
}

function createIcon() {
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-eraser";
  return icon;
}
