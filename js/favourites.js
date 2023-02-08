let favourites = document.getElementById("favs");
let userFav = localStorage.getItem("userFav");

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

<<<<<<< HEAD
  for (let i = 0; i < storedCards.length; i++) {
    if (userFav.includes(storedCards[i].cardName)) {
      let message = `<div class="col">
    <div class="card">
      <div class="card-header">
        <h2 class="text-center display-4 py-4">${storedCards[i].cardName}</h2>
      </div>
      <img style="width: 100%;margin: 0;padding: 0;text-align: center;max-height: 350px;display: block;"
        src=${storedCards[i].cardImg}>
      <p class="display-5">Ingredients:</p>
      <ol>${storedCards[i].ingredients}</ol>
      <div class="card-body">
        <p class="display-5">Instructions: </p>
        <p class=" mt-auto">${storedCards[i].cardInstructions}</p>
      </div>
=======
  for (let i = 0; i < storedCards.length; i += 2) {
    // display meal and drink pairs
    let meal = storedCards[i];
    let drink = storedCards[i + 1];

    // render them one next to each other
    let message = `<div class="results-wrap">
    <div class='card'>
      <h1 class="card-title">${meal.cardName}</h1>
      <img class="card-img-top" id="cardImg" alt="image of a meal" src=${meal.cardImg}>
      <p style='font-size: 15px;'class="card-text">Ingredients:</p><ul>${meal.ingredients}</ul>
      <p style='font-size: 15px;'class="card-text"> Instructions: ${meal.cardInstructions}</p>
    </div>
    <div class='card'>
      <h1 class="card-title">${drink.cardName}</h1>
      <img class="card-img-top" id="cardImg" alt="image of a drink" src=${drink.cardImg}>
      <p style='font-size: 15px;'class="card-text">Ingredients:</p><ul>${drink.ingredients}</ul>
      <p style='font-size: 15px;'class="card-text"> Instructions: ${drink.cardInstructions}</p>
>>>>>>> e503176bb8b6550cb7829b4795e400d6d5579627
    </div>
  </div>`;

      let li = document.createElement("div");

      li.innerHTML = message;

      favourites.appendChild(li);
    }
  }
}
document.getElementById('clear').addEventListener('click', function(){
  localStorage.removeItem('Drinks')
  location.reload()
})
displayFavourites();
