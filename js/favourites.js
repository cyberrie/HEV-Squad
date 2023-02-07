let favourites = document.getElementById("favs");

//This function will display store favorites
function displayFavourites() {
  let storedDrink = localStorage.getItem("Drinks");
  let storedMeal = localStorage.getItem("Meals");

  let storedCards = [];
  if (storedDrink != null)
    storedCards = storedCards.concat(JSON.parse(storedDrink));
  if (storedMeal != null)
    storedCards = storedCards.concat(JSON.parse(storedMeal));

  console.log(storedCards);

  for (let i = 0; i < storedCards.length; i++) {
    let message = `<h1>${storedCards[i].cardName}</h1> 
      <img src=${storedCards[i].cardImg}>
      <p>Ingredients:</p><ul>${storedCards[i].ingredients}</ul><p> Instructions: ${storedCards[i].cardInstructions}</p>`;

    let li = document.createElement("div");

    li.innerHTML = message;

    favourites.appendChild(li);
  }
}

displayFavourites();
