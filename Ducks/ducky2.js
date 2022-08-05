"use strict";

function displayDucks () {
    const outputArea = document.querySelector("div#output")
    
    while (outputArea.firstChild) {
        outputArea.removeChild(outputArea.firstChild);
    }

    axios
        .get("http://localhost:8080/duck/readAll")
        .then(response => {
            for (let duck of response.data) {
                const newZone = document.createElement("div");
                
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
                
                const delButton = document.createElement("button");
                delButton.addEventListener("click", function() {
                    outputArea.removeChild(newZone);
                    duckDeleter(duck);
                });
                delButton.innerText = "X";
                newZone.append(delButton);
                
                outputArea.append(newZone);
            }
        })
        .catch(error => console.log(error));

}

function duckDeleter (thisDuck) {
    axios
        .delete("http://localhost:8080/duck/delete/" + thisDuck.id)
        .then(response => {
            alert("Deleted " + thisDuck.name + ".");
            console.log(response);
            displayDucks();
        })
        .catch(error => {
            console.log(error);
            alert("Hmm. Duck not found.");
        });
}

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
            displayDucks();
        })
        .catch(error => console.log(error));
});
