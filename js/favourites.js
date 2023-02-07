let favourites = document.getElementById('favs')

//This function will display the user initials and scores//
function displayFavourites() {

    let storedUser = localStorage.getItem("Drinks");

    console.log(storedUser);
    let user = JSON.parse(storedUser);
    console.log(user.length);
    console.log(user);



    for (let i = 0; i < user.length; i++) {

    let message = `<h1>${user[i].drinkName}</h1> 
    <img src=${user[i].drinkImage}> <p>${user[i].instructions}</p> <ul>${user[i].ingredients}</ul>`;

    let li = document.createElement('div');

    li.innerHTML = message;
    
    favourites.appendChild(li);
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

        let message = `<h1>${user[i].mealName}</h1> 
        <img src=${user[i].mealImg}> <p>${user[i].instructions}</p> <ul>${user[i].ingredients}</ul>`;
    
        let li = document.createElement('div');
    
        li.innerHTML = message;
        
        favourites.appendChild(li);
        }

    }

if(localStorage.getItem("meals") != null){
    displayMeals();
}

displayMeals();