//DOM elements
let landingPage = document.querySelector(".emoji-wrap");
let landingPageIcons = document.getElementById("landingPageIcons");
let angry = document.querySelector("#selectAngry");
let happy = document.querySelector("#selectHappy");
let sad = document.querySelector("#selectSad");
let salsa = document.querySelector("#selectSalsa");
let emojiBtns = document.querySelectorAll(".img-fluid");
let emojiBtn = document.querySelectorAll(".img-fluid");
let questionTitle = document.querySelector(".questionTitle");
let options = document.querySelector("#drink-options");

// Drinks
let drinkBtns = document.querySelectorAll(".drinks");
let drinkBtn = document.querySelector(".drink-button");
let mocktail = document.getElementById("mocktail");
let cocktail = document.getElementById("cocktail");
let softDrink = document.getElementById("soft-drink");
let water = document.getElementById("water");
let surpriseMe = document.getElementById("surprise-me");

// Foods
let foodBtns = document.querySelectorAll(".foods");
let foodBtn = document.querySelector(".food-button");
let vegan = document.querySelector("#vegan");
let vegeterian = document.querySelector("#vegeterian");
let meat = document.querySelector("#meat");
let seafood = document.querySelector("#seafood");
let surprise = document.querySelector("#surpise");

// Questions based of which cocktails/ food will be rendered
let questions = [
  {
    title: "Are you thirsty?",
  },
  {
    title: "What do you fancy?",
    choices: ["Vegan", "Vegetarian", "Meat", "Seafood", "Surpise Me!"],
  },
];

emojiBtns.forEach(function (emojiBtn) {
  // addEventListener to emojiBtn
  emojiBtn.addEventListener("click", function (event) {
    // hide landing page
    landingPage.setAttribute("class", "hide");

    // set the click target and store it in a variable
    let selectedEmoji = event.target;

    // conditions, either button selected
    if (
      selectedEmoji === angry ||
      selectedEmoji === happy ||
      selectedEmoji === sad ||
      selectedEmoji === salsa
    ) {
      questionTitle.innerHTML = questions[0].title;
      // remove hide class
      document.querySelector(".drink-btns").classList.remove("hide");
      // add drinks options class
      document.querySelector(".drink-btns").classList.add("options");
    }
  });
});

let userDrinkChoice;
let drinkId;

drinkBtns.forEach(function (drinkBtn) {
  drinkBtn.addEventListener("click", function (event) {
    let selectedDrink = event.target;

    // conditions, either button selected
    if (
      selectedDrink === mocktail ||
      selectedDrink === cocktail ||
      selectedDrink === softDrink ||
      selectedDrink === water ||
      selectedDrink === surpriseMe
    ) {
      // appends 2nd question
      questionTitle.innerHTML = questions[1].title;

      // add hide class for drinks
      document.querySelector(".drink-btns").classList.add("hide");
      // remove drinks options class
      document.querySelector(".drink-btns").classList.remove("options");

      // remove hide class for food
      document.querySelector(".food-btns").classList.remove("hide");
      // add drinks options class
      document.querySelector(".food-btns").classList.add("options");
      userDrinkChoice = selectedDrink.textContent;
      chosenSelectedDrink();
    }
  });
});

// addEventListener to foodBtn

function chosenSelectedDrink() {
  let queryURL = `https://thecocktaildb.com/api/json/v1/1/filter.php?c=${userDrinkChoice}`;
  fetch(queryURL)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let drinks = response.drinks;
      // To get a random soft drink, pick a random index from the array
      let randomIndex = Math.floor(Math.random() * drinks.length);
      let randomDrink = drinks[randomIndex];
      // You can access the properties of the random soft drink, such as its name, ingredients, and instructions
      console.log(randomDrink.strDrink);
      drinkId = randomDrink.idDrink;

      return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}
    `)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          let drinkDetails = response.drinks
          console.log(drinkDetails);//this gives all the details based on the current randomised drink.
          console.log(drinkDetails[0].strDrinkThumb)//this displays the drink image.
          console.log(drinkDetails[0].strInstructions)//this displays the drink instructions.
        //This loops through the ingredients and displays the value if truthy.
          for (let i = 1; i <= 15; i++) {
            let ingredient = drinkDetails[0][`strIngredient${i}`];
            if (ingredient) {
              console.log(ingredient);//this renders each ingredient if it exists.
            }
          }
        });
    });
}

//www.thecocktaildb.com/api/json/v1/1/list.php?c=list - this list all the drink categories

// 'Cocktail', 'Soft Drink', 'cofee/tea', 'Other / Unknown', 'Shake', 'Punch / Party Drink', 'Beer', 'Cocoa'.
// based on the user selection we can then run a query to filter by that category, e.g user selects cocktails we will run c=cocktails and then provide them with a random drink from the fetch?

//ingredients has 15 choices, i should loop through each and display the ingredient if it has a value.


//Issues

    //How do I segment the drinks based upon the mood? e.g if they're happy what do we recommend? 
