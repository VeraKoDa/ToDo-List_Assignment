// ******************************** \\

// startpagina

getFetchData();

const Ul = document.getElementsByTagName("ul");
const parentUl = document.getElementById("list");
const parentFinishedUl = document.getElementById("done-list");
const inputField = document.getElementById("item");
const listItemsLi = document.querySelector("li");

// ******************************** \\

// input & checkbox eventListeners

submit.addEventListener("click", newInput);

inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    newInput();
  }
});

for (let item of Ul) {
  item.addEventListener("click", (event) => {
    let className = event.target.className;
    className.toLowerCase;

    switch (className) {
      case "fa-solid fa-xmark fa-lg":
        deleteFunction(event);
        break;
      case "checkbox":
        checkboxFunction(event);
        break;
      case "fa-solid fa-pencil":
      case "fa-solid fa-floppy-disk":
        edit(event);
        break;
    }
  });
}

// ******************************** \\

// functions

// Add (new) items to DOM

function addItem(description, id, done) {
  const newLi = document.createElement("li");
  newLi.setAttribute("id", id);
  newLi.className = done;

  const newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  newCheckbox.className = "checkbox";

  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.classList.add("text", done);
  newInput.setAttribute("disabled", "disabled");

  const editImg = document.createElement("i");
  editImg.className = "fa-solid fa-pencil";

  const deleteImg = document.createElement("i");
  deleteImg.className = "fa-solid fa-xmark fa-lg";

  // check if "done" is true or false
  switch (done) {
    case true:
      newCheckbox.checked = true;
      parentFinishedUl.prepend(newLi);
      newLi.append(newCheckbox, newInput, editImg, deleteImg);
      newInput.value = description;
      break;
    case false:
      parentUl.prepend(newLi);
      newLi.append(newCheckbox, newInput, editImg, deleteImg);
      newInput.value = description;
      break;

    default:
      alert("er is helaas iets fout gegaan. Probeer het nog eens");
      break;
  }

  // clear input field value
  document.getElementById("item").value = "";
}

// new input function

function newInput() {
  const userInput = document.getElementById("item").value;
  if (userInput != "") {
    let task = { description: `${userInput}`, done: false };
    postFetchData(task);
  } else {
    alert("Voer een geldige taak in");
    return;
  }
}
// edit function

function edit(data) {
  let id = data.target.parentElement.id;
  let className = data.target.className;
  let textElement = data.target.previousElementSibling;
  let textValue = textElement.value;

  // close function
  function editClose(textValue) {
    let changeItem = { description: textValue };
    putFetchData(changeItem, id);
    data.target.className = "fa-solid fa-pencil";
    textElement.setAttribute("disabled", "");
  }

  // voorwaarden close function

  if (className === "fa-solid fa-pencil") {
    let changeIcon = data.target;
    changeIcon.className = "fa-solid fa-floppy-disk";
    textElement.removeAttribute("disabled");
    textElement.focus();
  } else if (className === "fa-solid fa-floppy-disk") {
    editClose(textValue);
  }

  textElement.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      textValue = event.target.value;
      editClose(textValue);
    }
  });
}

// checkbox function

function checkboxFunction(data) {
  let id = data.target.parentElement.id;
  let checkbox = data.target.checked;
  let changeItem = "";
  let parentLi = data.target.parentElement;
  let input = data.target.nextElementSibling;

  switch (checkbox) {
    case true:
      changeItem = { done: true };
      putFetchData(changeItem, id);
      input.className = "text true";
      parentLi.className = true;
      parentFinishedUl.appendChild(parentLi);
      break;

    case false:
      changeItem = { done: false };
      putFetchData(changeItem, id);
      input.className = "text false";
      parentLi.className = false;
      parentUl.appendChild(parentLi);
      break;
  }
}

// delete function

function deleteFunction(data) {
  let id = data.target.parentElement.id;
  deleteFetchData(id);
  data.target.parentElement.remove();
}
