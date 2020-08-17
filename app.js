//UI elements
const count = document.getElementById("count");
const button = document.getElementById("getjokes");
const list = document.querySelector(".list-group");
const empty = document.getElementById("empty");

//button EventListeners
button.addEventListener("click", uploadJokes);

//Functions
function uploadJokes(e) {

  if (count.value == "") {
    //show ALERT
    showError("PLEASE give the number of jokes!", "red");

  } else {

    //Fetching API
    fetch(`https://api.icndb.com/jokes/random/${count.value}`)

      //Promises for the fetch API
      .then(function (data) {
        return data.json();
      })
      //Promises for the returning JSON data file
      .then(function (data) {
        //EDGE check
        if (data.type == "success") {
          const jokes = data.value;
          let output = "";
          jokes.forEach((element, index) => {
            output += `
          <li class="list-group-item mb-2">${index + 1}. ${element.joke}</li>
          `;
          });

          //clear input field
          count.value = "";

          // success ALERT
          showError("Done!", "green");

          //Remove empty
          empty.remove();
          
          //Inserting JOKES in list-group
          list.innerHTML = output;
        } else {

          //show TRY AGAIN
          showError("Please TRY AGAIN!","gold");
        }
      })
      .catch(err => console.log(err));
      
  }
}

//ALERT function
function showError(msg, color) {
  //CREATE elememt
  const div = document.createElement("div");
  //classname,color,msg
  div.className = "text-white text-center mb-3";
  div.style.backgroundColor = color;
  div.textContent = msg;
  //INSERTING
  document.querySelector(".forms").insertBefore(div, count);
  //Timer to remove ALERT
  setTimeout(() => count.previousSibling.remove(), 2000);
}
