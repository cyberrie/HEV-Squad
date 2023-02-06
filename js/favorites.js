let favoritesList = document.getElementById("favorites");

function printFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  // Sorting favorites alphabetically
  favorites.sort();

  favoritesList.innerHTML = "";
  for (let i = 0; i < favorites.length; i++) {
    let newFavorite = document.createElement("li");
    newFavorite.innerHTML = `${favorites[i].initials} - ${favorites[i].score}`;
    favoritesList.appendChild(newFavorite);
  }
}

printFavorites();

function clearStorage() {
  localStorage.clear();
  printFavorites();
}

let clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", clearStorage);