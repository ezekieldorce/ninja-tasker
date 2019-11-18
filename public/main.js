import { read } from "fs";

//select element
//listening for events
//manipulating events

//when we click on list item
const listItem = document.querySelector("ul");

listItem.addEventListener("click", function () {
    console.log(event.target.id);
    fetch("/delete/" + event.target.id, { method: "delete" }).then(function (res) {
        read.json();

    })
        .then(function () {
            window.location.href = "/home";
            event.target.parentMode.removeChild(event.target);
        });
});


//fire an event
//the event hits our server