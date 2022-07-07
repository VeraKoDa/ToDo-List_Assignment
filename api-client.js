const baseUrl = `http://localhost:3000`;

// GET data from server

const getFetchData = async () =>
  await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        let itemDescription = element.description;
        let itemId = element._id;
        let done = element.done;
        addItem(itemDescription, itemId, done);
      });
    })
    .catch((err) =>
      alert(
        `Helaas is er iets mis gegaan.. Probeer het nog eens. Omschrijving: ${err}`
      )
    );

// POST item on server

const postFetchData = async (taskInput) =>
  await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(taskInput),
    headers: {
      "content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let itemDescription = data.description;
      let itemId = data._id;
      let done = data.done;
      addItem(itemDescription, itemId, done);
      console.log(`Taak is toegevoegd in de database`);
    })
    .catch((err) =>
      alert(
        `Helaas is er iets mis gegaan.. Probeer het nog eens. Omschrijving: ${err}`
      )
    );

// CHANGE item on server

const putFetchData = async (changeItem, changeId) =>
  await fetch(baseUrl + `/` + changeId, {
    method: "PUT",
    body: JSON.stringify(changeItem),
    headers: {
      "content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => {
      console.log(`Taak is aangepast in de database`);
    })
    .catch((err) =>
      alert(
        `Helaas is er iets mis gegaan.. Probeer het nog eens. Omschrijving: ${err}`
      )
    );

// DELETE item on server

const deleteFetchData = (deleteItem) =>
  fetch(baseUrl + `/` + deleteItem, {
    method: "DELETE",
  })
    .then(() => console.log(`Taak is verwijderd uit de database`))
    .catch((err) =>
      alert(
        `Helaas is er iets mis gegaan.. Probeer het nog eens. Omschrijving: ${err}`
      )
    );
