"use strict";

const theCounter = document.querySelector("input");
const printArea = document.getElementById("log");

function stringPrinter (oldVal, newVal, operator) {
    let associatedButton = document.createElement('button');
    associatedButton.innerText = "x";
    associatedButton.setAttribute("class", operator);

    let newText = document.createElement('p');
    newText.innerText = oldVal + " " + operator + " = " + newVal + " ";

    associatedButton.addEventListener("click", function() {
        printArea.removeChild(newText);
    })
    newText.append(associatedButton)
    printArea.prepend(newText);
} 

// by using this for-loop to apply 'onclicks' adding new plus/minus buttons is made super easy! Just add it in the html document.
// for (let theButton of document.querySelector("div#buttons").getElementsByTagName("button")) {
//     theButton.addEventListener("click", function() {
//         let current = theCounter.value;
//         if (theButton.className == "+") theCounter.value = Number.parseInt(theCounter.value) + Number.parseInt(theButton.getAttribute("name"));
//         else if (theButton.className == "-") theCounter.value = Number.parseInt(theCounter.value) - Number.parseInt(theButton.getAttribute("name"));
//         else theCounter.value = 0;
//         stringPrinter(current, theCounter.value, theButton.getAttribute("class") + " " + theButton.getAttribute("name"))
    
//     })
// }

// this version checks the class at 'onclick' assignment, and so should be faster, as no conditions will be checked when pressing the buttons.
for (let theButton of document.querySelector("div#buttons").getElementsByTagName("button")) {
    if (theButton.className == "+") {
        theButton.addEventListener("click", function() {
            let current = theCounter.value;
            theCounter.value = Number.parseInt(theCounter.value) + Number.parseInt(theButton.getAttribute("name"));
            stringPrinter(current, theCounter.value, theButton.getAttribute("class") + " " + theButton.getAttribute("name"));
        })
    }
    else if (theButton.className == "-") {
        theButton.addEventListener("click", function() {
            let current = theCounter.value;
            theCounter.value = Number.parseInt(theCounter.value) - Number.parseInt(theButton.getAttribute("name"));
            stringPrinter(current, theCounter.value, theButton.getAttribute("class") + " " + theButton.getAttribute("name"));
        })
    }
    else {
        theButton.addEventListener("click", function() {
            let current = theCounter.value;
            theCounter.value = 0;
            stringPrinter(current, theCounter.value, theButton.getAttribute("class") + " " + theButton.getAttribute("name"));
        })
    }
}

let myWindow = window.open("", "", "width=400,height=200,top=400,left=200");
myWindow.document.write("<p>Welcome to Fred's Counter!<br>Add new buttons quickly and easily in the HTML file!</p>");
setTimeout(function () {
    myWindow.close();
}, 3000);