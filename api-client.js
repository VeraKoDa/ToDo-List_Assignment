const baseUrl = "http://localhost:3000";

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
      console.log("getFetchData response: ", data);
      data.forEach((element) => {
        let itemDescription = element.description;
        let itemId = element._id;
        let done = element.done;
        itemCheck(itemDescription, itemId, done);
      });
    })
    .catch((error) => console.log(error));

// getFetchData();

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
      console.log("data van postFetch: ", data);
      let itemDescription = data.description;
      let itemId = data._id;
      let done = data.done;
      itemCheck(itemDescription, itemId, done);
    })
    .catch((err) =>
      alert(
        `Helaas is er iets mis gegaan.. Probeer het nog eens. Omschrijving: ${err}`
      )
    );

// CHANGE item on server

const putFetchData = async (changeItem, changeId) =>
  await fetch(baseUrl + "/" + changeId, {
    method: "PUT",
    body: JSON.stringify(changeItem),
    headers: {
      "content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("response data van putFetchData: ", data);
      let itemDescription = data.description;
      let itemId = data._id;
      let done = data.done;
      itemCheck(itemDescription, itemId, done);
    });

// DELETE item on server

const deleteFetchData = (deleteItem) =>
  fetch(baseUrl + "/" + deleteItem, {
    method: "DELETE",
  });
