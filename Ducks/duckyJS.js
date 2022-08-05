"use strict";

document.querySelector("body > form#duckMaker").addEventListener("submit", function(event) {
    event.preventDefault();

    const body = {
        name: event.target.name.value,
        age: event.target.age.value,
        habitat: event.target.habitat.value,
        gender: event.target.gender.value};

    console.log("BODY: ", body);
    
    axios
        .post("http://localhost:8080/duck/create", body)
        .then(response => {
            console.log(response);
            event.target.reset();
            event.target.name.focus();
        })
        .catch(error => console.log(error));
});

document.querySelector("body > form#duckReader > button").addEventListener("click", function(event) {
    event.preventDefault();

    axios
        .get("http://localhost:8080/duck/readAll")
        .then(response => {
            let printArea = document.querySelector("div#output");
            let myDucks = response.data;
            for (let duck of myDucks) {
                let newZone = document.createElement("div");
                
                let newH = document.createElement("h2");
                newH.innerText = duck.name;
                newZone.append(newH);

                let ageP = document.createElement("p");
                ageP.innerText = `Age: ${duck.age}`;
                newZone.append(ageP);

                let habitatP = document.createElement("p");
                habitatP.innerText = `Habitat: ${duck.habitat}`;
                newZone.append(habitatP);

                let genderP = document.createElement("p");
                genderP.innerText = `Gender: ${duck.gender}`;
                newZone.append(genderP);

                let idP = document.createElement("p");
                idP.innerText = `ID: ${duck.id}`;
                newZone.append(idP);
                
                printArea.prepend(newZone);
            }
            console.log(response);
        })
        .catch(error => console.log(error));
})

document.querySelector("body > form#duckDeleter").addEventListener("submit", function(event) {
    event.preventDefault();

    const body = {id: event.target.id.value};

    axios
        .delete("http://localhost:8080/duck/delete/" + body.id)
        .then(response => {
            alert("Duck number: " + body.id + " deleted.");
            console.log(response);
        })
        .catch(error => {
            console.log(error);
            alert("Hmm. Duck not found.");
        });
})

document.querySelector("body > form#duckHooker").addEventListener("submit", function(event) {
    event.preventDefault();

    const body = {id: event.target.id.value};

    axios
        .get("http://localhost:8080/duck/readById/" + body.id)
        .then(response => {
            console.log(response);
            let printArea = document.querySelector("div#output");
            let theDuck = response.data;
            let newZone = document.createElement("div");
                
                let newH = document.createElement("h2");
                newH.innerText = theDuck.name;
                newZone.append(newH);

                let ageP = document.createElement("p");
                ageP.innerText = `Age: ${theDuck.age}`;
                newZone.append(ageP);

                let habitatP = document.createElement("p");
                habitatP.innerText = `Habitat: ${theDuck.habitat}`;
                newZone.append(habitatP);

                let genderP = document.createElement("p");
                genderP.innerText = `Gender: ${theDuck.gender}`;
                newZone.append(genderP);

                let idP = document.createElement("p");
                idP.innerText = `ID: ${theDuck.id}`;
                newZone.append(idP);
                
                printArea.prepend(newZone);
        })
        .catch(error => {
            console.log(error);
            alert("We don't have that duck...")
        });
})