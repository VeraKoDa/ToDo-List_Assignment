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
        `Er is helaas een fout opgetreden bij het item met naam: ${description}`
      );
  }
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

// //
// let checkBox = document.getElementsByTagName("input[type=checkbox]");
// console.log("checkbox: ", checkBox);
// for (let check of checkBox) {
//   check.addEventListener("click", console.log("op checkbox geklikt"));
// }

function edit(data) {
  let textElement = data.target.previousElementSibling;
  let textValue = textElement.value;
  let id = data.target.parentElement.id;
  let className = data.target.className;
  console.log("textValue is: ", textValue);

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
      console.log(event);
      textValue = event.target.value;
      editClose(textValue);
    }
  });

  let editClose = (textValue) => {
    let changeItem = { description: textValue };
    putFetchData(changeItem, id);
    console.log("className", data.target.className);
    data.target.className = "fa-solid fa-pencil";
    textElement.setAttribute("disabled", "");
  };
}

// originele:

function edit(data) {
  let textElement = data.target.previousElementSibling;
  let textValue = textElement.value;
  let id = data.target.parentElement.id;
  let className = data.target.className;
  console.log("textValue is: ", textValue);
  switch (className) {
    case "fa-solid fa-pencil":
      let changeIcon = data.target;
      changeIcon.className = "fa-solid fa-floppy-disk";
      textElement.removeAttribute("disabled");
      textElement.focus();

      textElement.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          console.log(event);
        }
      });

      break;
    case "fa-solid fa-floppy-disk":
      let changeItem = { description: textValue };
      putFetchData(changeItem, id);
      data.target.className = "fa-solid fa-pencil";
      textElement.setAttribute("disabled", "");
      break;
  }
}

// function edit(data) {
//   let textElement = data.target.previousElementSibling;
//   let textValue = textElement.value;
//   let id = data.target.parentElement.id;
//   let className = data.target.className;
//   console.log("textValue is: ", textValue);

//   if (className === "fa-solid fa-pencil") {
//     let changeIcon = data.target;
//     changeIcon.className = "fa-solid fa-floppy-disk";
//     textElement.removeAttribute("disabled");
//     textElement.focus();
//   } else if (className === "fa-solid fa-floppy-disk") {
//     let changeItem = { description: textValue };
//     putFetchData(changeItem, id);
//     data.target.className = "fa-solid fa-pencil";
//     textElement.setAttribute("disabled", "");
//   }

//   textElement.addEventListener("keypress", (event) => {
//     if (event.key === "Enter") {
//       console.log(event)
//       textValue = data.target.value;
//       return textValue;
//     }
//   });
// }
