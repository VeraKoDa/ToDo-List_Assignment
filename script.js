getFetchData();

const parentUl = document.getElementById("list");
const parentFinishedUl = document.getElementById("done-list");
const inputField = document.getElementById("item");
const listItemsLi = document.querySelector("li");

// Event listeners

parentUl.addEventListener("click", (event) => {
  let name = event.target.tagName;

  switch (name) {
    case "IMG":
      deleteFunction(event);
      break;
    case "INPUT":
      changeFunction(event);
      break;
  }
});

parentFinishedUl.addEventListener("click", (event) => {
  let name = event.target.tagName;

  switch (name) {
    case "IMG":
      deleteFunction(event);
      break;
    case "INPUT":
      changeFunction(event);
      break;
    default:
      console.log(
        "Naam bevat iets waarvoor geen functie is geschreven..",
        name
      );
  }
});

submit.addEventListener("click", inputFunction);
inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    inputFunction();
  }
});

//

// functions

// Add new Item to API and DOM

function itemCheck(description, id, done) {
  switch (done) {
    case true:
      addToFinished(description, id, done);
      break;
    case false:
      addToDoItem(description, id, done);
      break;

    default:
      console.log(
        "Er is helaas een fout opgetreden bij het item met naam: ",
        description
      );
  }
}

function addToFinished(description, id, done) {
  const newLi = document.createElement("li");
  const newInput = document.createElement("input");
  const newP = document.createElement("p");
  const deleteImg = document.createElement("img");

  newInput.type = "checkbox";
  newInput.checked = true;
  newLi.setAttribute("id", id);
  newLi.className = done;
  newP.className = "textItem";
  deleteImg.src = "/todo-list-assignment/images/xIcon.png";
  deleteImg.className = "image";

  // add together
  parentFinishedUl.prepend(newLi);
  newLi.append(newInput, newP, deleteImg);
  newP.textContent = description;

  // clear input field value
  document.getElementById("item").value = "";
}

function addToDoItem(description, id, done) {
  const newLi = document.createElement("li");
  const newInput = document.createElement("input");
  const newP = document.createElement("p");
  const deleteImg = document.createElement("img");

  newInput.type = "checkbox";
  newLi.setAttribute("id", id);
  newLi.className = done;
  newP.className = "textItem";
  deleteImg.src = "/todo-list-assignment/images/xIcon.png";
  deleteImg.className = "image";

  // add together
  parentUl.appendChild(newLi);
  newLi.append(newInput, newP, deleteImg);
  newP.textContent = description;

  // clear input field value
  document.getElementById("item").value = "";
}

// input functions

function inputFunction() {
  const userInput = document.getElementById("item").value;
  if (userInput != "") {
    let task = { description: `${userInput}`, done: false };
    postFetchData(task);
  } else {
    alert("Voer een geldige taak in");
    return;
  }
}

//

// change function

function changeFunction(data) {
  let changeId = data.target.parentElement.id;
  const cb = data.target.tagName === "INPUT";
  console.log("changeId in changeFunction: ", changeId);
  if (cb != true) {
    return;
  } else if (data.target.type === "checkbox" && data.target.checked === true) {
    let changeItem = { done: true };
    putFetchData(changeItem, changeId);
    data.target.parentElement.remove();
  } else if (data.target.type === "checkbox" && data.target.checked === false) {
    let changeItem = { done: false };
    putFetchData(changeItem, changeId);
    data.target.parentElement.remove();
  }
}

// delete function

function deleteFunction(data) {
  console.log("data in deleteFunction: ", data);
  let listItem = data.target.parentElement.id;
  console.log("listItem in deleteFunction: ", listItem);
  deleteFetchData(listItem);
  data.target.parentElement.remove();
}

// //
// let checkBox = document.getElementsByTagName("input[type=checkbox]");
// console.log("checkbox: ", checkBox);
// for (let check of checkBox) {
//   check.addEventListener("click", console.log("op checkbox geklikt"));
// }
