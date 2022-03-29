const $chirpsContainer = $("#Chirps-container");
const $nameInput = $(".name-input");
const $textInput = $(".text-input");
const $submitButton = $("#submit-btn");
const route = "http://localhost:3000/api/chirps";

$submitButton.click(() => {
  let t = {
    name: $nameInput.val(),
    text: $textInput.val(),
  };
  $.ajax({
    url: route,
    type: "POST",
    data: JSON.stringify(t),
    contentType: "application/json",
  });
  gettingData();
});

let deleteItem = (ItemNumber) => {
  $.ajax(`${route}/${ItemNumber}`, {
    type: "DELETE",
  });
  gettingData();
};

let editItemFunc = (itemNumber, newName, newText) => {
  let t = {
    name: newName,
    text: newText,
  };
  $.ajax({
    url: `${route}/${itemNumber}`,
    type: "PUT",
    data: JSON.stringify(t),
    contentType: "application/json",
  });
  gettingData();
  // console.log(itemNumber, name, text);
};

let formStatus = false; //put let outside func to show/hide form this was q uick fix
let showEditForm = (itemNum) => {
  let $itemDiv = $(`#modal-div${itemNum}`);
  if (!formStatus) {
    $itemDiv.css("display", "block");
    formStatus = true;
  } else {
    $itemDiv.css("display", "none");
    formStatus = false;
  }
};

let gettingData = () => {
  $.get(route).done(function (data) {
    $chirpsContainer.empty();
    for (const key in data) {
      let chirpItem = data[key];
      //   console.log(chirpItem)
      let user = chirpItem.name;
      let msg = chirpItem.text;
      let $editButton = $("<button>Edit me</button>").click(() => {
        showEditForm(key);
      });
      let $removeButton = $("<button> X </button>").click(() =>
        deleteItem(key)
      );
      if (user != undefined) {
        $chirpsContainer.append(
          `<div id="chirp-${key}" class="chirp-div-ind">
                <h3>${user}</h3>
                <p>${msg}</p>
            </div>`
        );
        $(`#chirp-${key}`).append($editButton);
        $(`#chirp-${key}`).append($removeButton);
        // modal
        $(`#chirp-${key}`).append(
          `                
          <div class="modal-div" id="modal-div${key}">
          <div class="justified-div">
          <form action="">
              <label>Name: </label>
              <input class="edit-name${key}" type="text" placeholder="name">
              <div></div>
              <label>Message: </label>
              <input class="edit-text${key}" type="text" placeholder="chirp">
              <button type="button" id="" class="edit-btn${key}">Submit</button>
           </form>
           </div>
          </div>`
        );
        let $newName = $(`.edit-name${key}`);
        let $newText = $(`.edit-text${key}`);
        $(`.edit-btn${key}`).click(() => {
          editItemFunc(key, $newName.val(), $newText.val());
        });
      }
    }
  });
};
gettingData();

// $.get(route).done((chirpsObject) => {
//   for (const chirpId in chirpsObject) {
//     let chirps = chirpsObject[chirpId];
//     let username = chirps.name;
//     let text = chirps.text;
//     console.log(username)
//     console.log(text)
//   }
// });
