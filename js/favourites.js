let favourites = document.getElementById("favs");

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
  }

  setCardHeight();
}

displayFavourites();

// Drink card height to match the meal card height
function setCardHeight() {
  const card1 = document.getElementById("card-one");
  const card2 = document.getElementById("card-two");

  console.log(`card1 height: ${card1.offsetHeight}`);

  window.requestAnimationFrame(() => {
    const cardHeight = card2.offsetHeight;

    console.log(`Setting card2 height to: ${cardHeight}`);

    card2.style.height = cardHeight;
  });
}
