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
let surprise = document.querySelector("#surprise");

// Questions based of which cocktails/ food will be rendered
let questions = [
  {
    title: "Are you thirsty?",
  },
  {
    title: "Wanna bite?",
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

let drinkResults = document.getElementById("drinkResults");

function chosenSelectedDrink() {
  if (userDrinkChoice == "Surprise Me") {
    for (let i = 0; i < 1; i++) {
      let randomIndex = Math.floor(Math.random() * (drinkBtns.length - 1));
      let randomValue = drinkBtns[randomIndex];
      userDrinkChoice = randomValue.textContent;
    }
  }

  let queryURL = `https://thecocktaildb.com/api/json/v1/1/filter.php?c=${userDrinkChoice}`;
  fetch(queryURL)
    .then((response) => response.json())
    .then((response) => {
      let drinks = response.drinks;
      // To get a random soft drink, pick a random index from the array
      let randomIndex = Math.floor(Math.random() * drinks.length);
      let randomDrink = drinks[randomIndex];
      // You can access the properties of the random soft drink, such as its name, ingredients, and instructions
      console.log(randomDrink.strDrink); //drink name
      drinkId = randomDrink.idDrink;

      return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}
    `)
        .then((response) => response.json())
        .then((response) => {
          let drinkDetails = response.drinks;
          console.log(drinkDetails[0].strDrinkThumb); //this displays the drink image.
          console.log(drinkDetails[0].strInstructions); //this displays the drink instructions.
          //This loops through the ingredients and displays the value if truthy.
          let string = []; //Create an empty array to store the truthy ingredients.

          for (let i = 1; i <= 15; i++) {
            let ingredient = drinkDetails[0][`strIngredient${i}`];

            if (ingredient) {
              console.log(ingredient); //this renders each ingredient if it exists.
              string.push(ingredient); //this cycles through each truthy ingredient and pushes it into the new array.
            }
          }
          console.log(string);

          let displayDrink = document.createElement("div"); // this is a test div to append the drink details to the page.
          displayDrink.innerHTML = `<h1>${randomDrink.strDrink}</h1>
          <img src="${drinkDetails[0].strDrinkThumb}" alt="Image of a drink">
          <p>Instructions: ${drinkDetails[0].strInstructions}</p>
          <p>Ingredients: ${string
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("")}</p>
          `;
          drinkResults.append(displayDrink);
        });
    });
}

//www.thecocktaildb.com/api/json/v1/1/list.php?c=list - this list all the drink categories

// 'Cocktail', 'Soft Drink', 'cofee/tea', 'Other / Unknown', 'Shake', 'Punch / Party Drink', 'Beer', 'Cocoa'.
// based on the user selection we can then run a query to filter by that category, e.g user selects cocktails we will run c=cocktails and then provide them with a random drink from the fetch?

//ingredients has 15 choices, i should loop through each and display the ingredient if it has a value.

//Issues

//How do we or are we going to segment the drinks based upon the mood? e.g if they're happy what do we recommend?
//No option for water in the API, so we could hard-core this instead?
//ICEBOX - randomise the drink and meal selection?

function randomMeats(meatOptions) {}

// API check mealsDB

// user input - API meal categories: vegan, vegeterian, meat[beef, chicken, lamb, pork, goat], seafood, surprise me: mix them all up? only mixed vegan, vegeterian and seafood as meats are a pain

// Function to fetch meal data based on user input
function fetchMealData(category) {
  // Hook Meat user input into all meat options on the API [beef, chicken, lamb, pork, goat]
  if (category === "Meat") {
    // meat options on categories API
    let randomMeat = ["Beef", "Chicken", "Lamb", "Pork", "Goat"];
    // empty variable to store meat
    let chosenMeat;

    function getRandomValue() {
      let randomIndex = Math.floor(Math.random() * randomMeat.length);
      chosenMeat = randomMeat[randomIndex];
    }
    getRandomValue();
    //condition

    let queryURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${chosenMeat}`;
    fetch(queryURL)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        let meals = response.meals;
        let randomIndex = Math.floor(Math.random() * meals.length);
        let randomMeals = meals[randomIndex];
        console.log(randomMeals);

        let mealId = randomMeals.idMeal;
        return fetch(
          `https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
      })
      .then((response) => response.json())
      .then((selectedMeal) => {
        // Render data
        let mealDetails = selectedMeal.meals;

        // Ingredients and Quantity key-value iteration and 'pairing'
        let stringIngr = []; //Create an empty array to store the truthy ingredients.
        let stringMeasure = [];

        for (let i = 1; i <= 20; i++) {
          let ingredient = mealDetails[0][`strIngredient${i}`];
          let quantity = mealDetails[0][`strMeasure${i}`];

          if (ingredient && quantity) {
            console.log("ingredient:", ingredient, "quantity:", quantity); //this renders each ingredient if it exists.
            stringIngr.push(ingredient); //this cycles through each truthy ingredient and pushes it into the new array.
            stringMeasure.push(quantity);
          }
        }
        console.log("ingredient:", stringIngr, "quantity:", stringMeasure);

        // Render Data - create func for this
        let mealCard = document.querySelector("#meal-card");
        let mealName = mealDetails[0].strMeal;
        console.log(mealName);
        let mealImg = mealDetails[0].strMealThumb;
        let mealIngr = stringIngr;
        let mealInstr = mealDetails[0].strInstructions;
        let ingrQuant = stringMeasure;
        let ingredients = mealIngr
          .map((ingredient, index) => `${ingredient}, ${ingrQuant[index]}; `)
          .join("");

        let htmlMealData = `<h2>${mealName}</h2>
        <img src='${mealImg}'>
        <li>Ingredients: ${ingredients}</li>
        <p>Instructions: ${mealInstr}</p>`;

        mealCard.innerHTML = htmlMealData;
      });

    // Mix them all up and randomise for surprise me
  } else if (category === "Surprise Me") {
    const categories = ["Vegan", "Vegetarian", "Seafood"];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    console.log(randomCategory);
    fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${randomCategory}`)
      .then((response) => response.json())
      // This is the returned selected meal data (array of objects), function to randomly select one meal
      .then((selectedData) => {
        let index = Math.floor(Math.random() * selectedData.meals.length);
        console.log(index);
        let randomSurpriseMeal = selectedData.meals[index];
        console.log(randomSurpriseMeal);

        let mealId = randomSurpriseMeal.idMeal;
        return fetch(
          `https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
      })
      .then((response) => response.json())
      .then((selectedMeal) => {
        let mealDetails = selectedMeal.meals;

        // Ingredients and Quantity key-value iteration and 'pairing'
        let stringIngr = []; //Create an empty array to store the truthy ingredients.
        let stringMeasure = [];

        for (let i = 1; i <= 20; i++) {
          let ingredient = mealDetails[0][`strIngredient${i}`];
          let quantity = mealDetails[0][`strMeasure${i}`];

          if (ingredient && quantity) {
            console.log("ingredient:", ingredient, "quantity:", quantity); //this renders each ingredient if it exists.
            stringIngr.push(ingredient); //this cycles through each truthy ingredient and pushes it into the new array.
            stringMeasure.push(quantity);
          }
        }
        console.log("string:", stringIngr, "quantity:", stringMeasure);

        // Render Data - create func for this
        let mealCard = document.querySelector("#meal-card");
        let mealName = mealDetails[0].strMeal;
        console.log(mealName);
        let mealImg = mealDetails[0].strMealThumb;
        let mealInstr = mealDetails[0].strInstructions;
        let mealIngr = stringIngr;
        let ingrQuant = stringMeasure;
        let ingredients = mealIngr
          .map((ingredient, index) => `${ingredient}, ${ingrQuant[index]}; `)
          .join("");

        let htmlMealData = `<h2>${mealName}</h2>
        <img src='${mealImg}'>
        <li>Ingredients: ${ingredients}</li>
        <p>Instructions: ${mealInstr}</p>`;

        mealCard.innerHTML = htmlMealData;
      });
  } else {
    fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((mealData) => {
        let index = Math.floor(Math.random() * mealData.meals.length);
        let generatedRandomMeal = mealData.meals[index];

        // Render Data - create func for this
        let mealId = generatedRandomMeal.idMeal;
        return fetch(
          `https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
      })
      .then((response) => response.json())
      .then((selectedMeal) => {
        let mealDetails = selectedMeal.meals;

        let stringIngr = []; //Create an empty array to store the truthy ingredients.
        let stringMeasure = [];

        for (let i = 1; i <= 20; i++) {
          let ingredient = mealDetails[0][`strIngredient${i}`];
          let quantity = mealDetails[0][`strMeasure${i}`];

          if (ingredient && quantity) {
            console.log("ingredient:", ingredient, "quantity:", quantity); //this renders each ingredient if it exists.
            stringIngr.push(ingredient); //this cycles through each truthy ingredient and pushes it into the new array.
            stringMeasure.push(quantity);
          }
        }
        console.log("ingredient:", stringIngr, "quantity:", stringMeasure);

        // Render data - create func for this
        let mealCard = document.querySelector("#meal-card");
        let mealName = mealDetails[0].strMeal;
        console.log(mealName);
        let mealImg = mealDetails[0].strMealThumb;
        let mealInstr = mealDetails[0].strInstructions;
        let mealIngr = stringIngr;
        let ingrQuant = stringMeasure;
        let ingredients = mealIngr
          .map((ingredient, index) => `${ingredient}, ${ingrQuant[index]}; `)
          .join("");

        let htmlMealData = `<h2>${mealName}</h2>
        <img src='${mealImg}'>
        <li>Ingredients: ${ingredients}</li>
        <p>Instructions: ${mealInstr}</p>`;

        mealCard.innerHTML = htmlMealData;
      });
  }
}

// Hook user input into food buttons
vegan.addEventListener("click", () => fetchMealData("Vegan"));
vegeterian.addEventListener("click", () => fetchMealData("Vegetarian"));
seafood.addEventListener("click", () => fetchMealData("Seafood"));
surprise.addEventListener("click", () => fetchMealData("Surprise Me"));
meat.addEventListener("click", () => fetchMealData("Meat"));

// Render meal data based on the user input

// // Function to render meal
function renderMeal(mealDetails, stringIngr) {}
