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

  for (let i = 0; i < storedCards.length; i++) {
    let card = storedCards[i];

    // render the card
    let message = `<div class="results-wrap"><div class='card'>
      <h1 class="card-title">${card.cardName}</h1>
      <img class="card-img-top" id="cardImg" alt="image of a meal/drink" src=${card.cardImg}>
      <p style='font-size: 15px;'class="card-text">Ingredients:</p><ul>${card.ingredients}</ul>
      <p style='font-size: 15px;'class="card-text"> Instructions: ${card.cardInstructions}</p>
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
document.querySelector(".clear-favs").addEventListener("click", function () {
  document.querySelector(".wrapper").innerHTML = "";
  localStorage.clear();

  document.querySelector(".clear-favs").classList.remove("clear-favs");
  document.querySelector(".bin").classList.add("hide");
});
