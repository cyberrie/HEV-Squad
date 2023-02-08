let favourites = document.getElementById("favs");
let bin = document.querySelector(".bin");

//This function will display store favorites
function displayFavourites() {
  // retrieve them from local storage
  let storedDrink = localStorage.getItem("Drinks");
  let storedMeal = localStorage.getItem("Meals");

  let storedCards = [];
  if (storedDrink != null)
    storedCards = storedCards.concat(JSON.parse(storedDrink));
  if (storedMeal != null)
    storedCards = storedCards.concat(JSON.parse(storedMeal));

  console.log(storedCards);

  for (let i = 0; i < storedCards.length; i += 2) {

    // display 2 cards next to each other

    let meal = storedCards[i];
    let drink = storedCards[i + 1];

    // render them one next to each other
    let message = `<div class="results-wrap">

    <div class='card' id='card-one'>

      <h1 class="card-title">${meal.cardName}</h1>
      <img class="card-img-top" id="cardImg" alt="image of a meal" src=${meal.cardImg}>
      <p style='font-size: 15px;'class="card-text">Ingredients:</p><ul>${meal.ingredients}</ul>
      <p style='font-size: 15px;'class="card-text"> Instructions: ${meal.cardInstructions}</p>
    </div>

    <div class='card' id='card-two'>

      <h1 class="card-title">${drink.cardName}</h1>
      <img class="card-img-top" id="cardImg" alt="image of a drink" src=${drink.cardImg}>
      <p style='font-size: 15px;'class="card-text">Ingredients:</p><ul>${drink.ingredients}</ul>
      <p style='font-size: 15px;'class="card-text"> Instructions: ${drink.cardInstructions}</p>
    </div>
  </div>`;

    let li = document.createElement("div");

    li.innerHTML = message;

    favourites.appendChild(li);

    //unhide clear btn
    document.querySelector(".bin").classList.remove("hide");
    // add clear btn
    document.querySelector(".bin").classList.add("clear-favs");
  }
}
displayFavourites();



// function to clear favs
document.querySelector(".bin").addEventListener("click", function () {
  document.querySelector(".wrapper").innerHTML = "";
  localStorage.clear();

  document.querySelector(".bin").classList.remove("clear-favs");
  document.querySelector(".bin").classList.add("hide");
});


