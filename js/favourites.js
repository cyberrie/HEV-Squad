let highScores = document.getElementById('favs')

//This function will display the user initials and scores//
function displayFavourites() {

    let storedUser = localStorage.getItem("Drinks");

    console.log(storedUser);
    let user = JSON.parse(storedUser);
    console.log(user.length);
    console.log(user);



    for (let i = 0; i < user.length; i++) {

    let message = user[i].drinkName + ' ' + user[i].instructions + user[i].ingredients;

    let li = document.createElement('div');

    li.innerHTML = message;
    
    highScores.appendChild(li);
    }
} 

if(localStorage.getItem("drinks") != null){
    displayFavourites();
}

displayFavourites();

// clearFavourites.addEventListener('click', function (){
// localStorage.clear();
// location.reload();
// });

function displayMeals() {
    let storedUser = localStorage.getItem("Meals");

    console.log(storedUser);
    let user = JSON.parse(storedUser);
    console.log(user.length);
    console.log(user);

    for (let i = 0; i < user.length; i++) {
    let message = user[i].mealName + ' ' + user[i].instructions + user[i].ingredients;

    let li = document.createElement('div');

    li.innerHTML = message;
    
    highScores.appendChild(li);
    }
}

if(localStorage.getItem("meals") != null){
    displayMeals();
}

displayMeals();