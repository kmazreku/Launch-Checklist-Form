window.addEventListener("load", function () {
  function fetchData() {
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(
      function (response) {
        response.json().then(function (json) {
          let index = Math.floor((Math.random() * 10) / 2);
          document.getElementById(
            "missionTarget"
          ).innerHTML = `<h2>Mission Destination</h2>
          <ol>
             <li>Name: ${json[index].name}</li>
             <li>Diameter: ${json[index].diameter}</li>
             <li>Star: ${json[index].star}</li>
             <li>Distance from Earth: ${json[index].distance}</li>
             <li>Number of Moons: ${json[index].moons}</li>
          </ol>
          <img src="${json[index].image}">
          `;
        });
      }
    );
  }

  fetchData();

  let form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    let pilotNameInput = document.querySelector("input[name=pilotName]");
    let copilotNameInput = document.querySelector("input[name=copilotName]");
    let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
    let cargoMassInput = document.querySelector("input[name=cargoMass]");

    function showFaultyItems() {
      let faultyItems = document.getElementById("faultyItems");
      faultyItems.style.visibility = "visible";
      event.preventDefault();
    }

    function updateLunchStatus(message, color) {
      document.getElementById("launchStatus").innerHTML = message;
      document.getElementById("launchStatus").style.color = color;
    }

    if (
      pilotNameInput.value === "" ||
      copilotNameInput.value === "" ||
      fuelLevelInput.value === "" ||
      cargoMassInput.value === ""
    ) {
      alert("All fields are required!");
      event.preventDefault();
    }

    let numberChar = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let pilotNameArray = pilotNameInput.value.toLowerCase().split("");
    for (i = 0; i < pilotNameArray.length; i++) {
      if (numberChar.includes(pilotNameArray[i])) {
        showFaultyItems();
        let pilotStatus = document.getElementById("pilotStatus");
        pilotStatus.innerHTML = `Pilot Name: ${pilotNameInput.value}`;
        alert("Enter valid Pilot Name!");
      }
    }

    let copilotNameArray = copilotNameInput.value.toLowerCase().split("");
    for (i = 0; i < copilotNameArray.length; i++) {
      if (numberChar.includes(copilotNameArray[i])) {
        showFaultyItems();
        let copilotStatus = document.getElementById("copilotStatus");
        copilotStatus.innerHTML = `Co-pilot Name: ${copilotNameInput.value}`;
        alert("Enter valid Co-pilot Name!");
      }
    }
    let fuelLevelArray = fuelLevelInput.value.split("");
    for (i = 0; i < fuelLevelArray.length; i++) {
      if (!numberChar.includes(fuelLevelArray[i])) {
        alert("Fuel Level should be Number!");
        event.preventDefault();
      }
    }
    let cargoMassArray = cargoMassInput.value.split("");
    for (i = 0; i < cargoMassArray.length; i++) {
      if (!numberChar.includes(cargoMassArray[i])) {
        alert("Cargo Mass should be Number!");
        event.preventDefault();
      }
    }
    if (
      Number(fuelLevelInput.value) < 10000 &&
      Number(cargoMassInput.value) > 10000
    ) {
      showFaultyItems();
      let fuelStatus = document.getElementById("fuelStatus");
      fuelStatus.innerHTML = `There is not enough fuel for the journey.`;
      let cargoStatus = document.getElementById("cargoStatus");
      cargoStatus.innerHTML = `There is too much mass for the shuttle to take off.`;
      updateLunchStatus("Shuttle not ready for launch", "red");
    } else if (Number(fuelLevelInput.value) < 10000) {
      showFaultyItems();
      let fuelStatus = document.getElementById("fuelStatus");
      fuelStatus.innerHTML = `There is not enough fuel for the journey.`;
      updateLunchStatus("Shuttle not ready for launch", "red");
    } else if (Number(cargoMassInput.value) > 10000) {
      showFaultyItems();
      let cargoStatus = document.getElementById("cargoStatus");
      cargoStatus.innerHTML = `There is too much mass for the shuttle to take off.`;
      updateLunchStatus("Shuttle not ready for launch", "red");
    } else {
      updateLunchStatus("Shuttle is ready for launch", "green");
      event.preventDefault();
    }
  });
});

// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!

*/
