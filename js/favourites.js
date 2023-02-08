let favourites = document.getElementById("favs");
let userFav = localStorage.getItem("userFav");

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


