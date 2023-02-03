//Global variables

let landingPageIcons = document.getElementById('landingPageIcons');


let queryURL = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
fetch(queryURL)
    .then((response) => response.json())
    .then((response) => {

        console.log(response);
})