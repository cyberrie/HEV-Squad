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
let resultsContainer = document.getElementById("results-container");
let container = document.querySelector(".container");

// Drinks
let userDrinkChoice;
let drinkId;
let drinkBtns = document.querySelectorAll(".drinks");
let drinkBtn = document.querySelector(".drink-button");
let shake = document.getElementById("shake");
let cocktail = document.getElementById("cocktail");
let softDrink = document.getElementById("soft-drink");
let coffeeTea = document.getElementById("coffeeTea");
let surpriseMe = document.getElementById("surprise-me");
let drinkResults = document.getElementById("drink-card");
let drinkCardName = document.getElementById("drinkCardName");
let drinkCardImg = document.getElementById("drinkCardImg");
let drinkCardInstructions = document.getElementById("drinkCardInstructions");
let drinkCardUL = document.getElementById("drinkCardUL");

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

drinkBtns.forEach(function (drinkBtn) {
  drinkBtn.addEventListener("click", function (event) {
    let selectedDrink = event.target;
    // conditions, either button selected
    if (selectedDrink.tagName === "IMG") {
      selectedDrink = selectedDrink.parentNode.textContent.trim();
    } else {
      selectedDrink = event.target.textContent.trim();
    }
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
    console.log(selectedDrink);

    userDrinkChoice = selectedDrink;

    chosenSelectedDrink(userDrinkChoice);
  });
});

// addEventListener to foodBtn

function chosenSelectedDrink(userDrinkChoice) {
  console.log(userDrinkChoice);

  if (userDrinkChoice === "Surprise Me") {
    for (let i = 0; i < 1; i++) {
      let randomIndex = Math.floor(Math.random() * (drinkBtns.length - 1));
      let randomValue = drinkBtns[randomIndex];
      userDrinkChoice = randomValue.textContent.trim();
    }
  }
  console.log(userDrinkChoice);
  let queryURL = `https://thecocktaildb.com/api/json/v1/1/filter.php?c=${userDrinkChoice}`;
  fetch(queryURL)
    .then((response) => response.json())
    .then((response) => {
      let drinks = response.drinks;
      // To get a random soft drink, pick a random index from the array
      let randomIndex = Math.floor(Math.random() * drinks.length);
      let randomDrink = drinks[randomIndex];
      // You can access the properties of the random soft drink, such as its name, ingredients, and instructions
      drinkId = randomDrink.idDrink;

      return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}
    `)
        .then((response) => response.json())
        .then((response) => {
          let drinkDetails = response.drinks;
          //This loops through the ingredients and displays the value if truthy.
          let drinkIngredientArray = []; //Create an empty array to store the truthy ingredients.
          let drinkMeasureArray = [];
          for (let i = 1; i <= 15; i++) {
            let ingredient = drinkDetails[0][`strIngredient${i}`];
            let measure = drinkDetails[0][`strMeasure${i}`];

            if (ingredient && measure) {
              drinkIngredientArray.push(ingredient); //this cycles through each truthy ingredient and pushes it into the new array.
              drinkMeasureArray.push(measure);
            }
          }
          drinkCardName.textContent = `${randomDrink.strDrink}`;
          drinkCardImg.src = `${drinkDetails[0].strDrinkThumb}`;
          drinkCardInstructions.textContent = `Instructions: ${drinkDetails[0].strInstructions}`;
          let cardIngMeasure = drinkIngredientArray
            .map(
              (ingredient, index) =>
                `<li>${ingredient}, ${drinkMeasureArray[index]}</li>`
            )
            .join("");
          drinkCardUL.innerHTML = cardIngMeasure;
          drinkResults.classList.remove("hide");
          // Create a variable storing drink values
          let newDrinkIngStorage = {
            drinkName: `${randomDrink.strDrink}`,
            ingredients: `${cardIngMeasure}`,
            instructions: `${drinkDetails[0].strInstructions}`,
          };
          let drinks = localStorage.getItem("Drinks");

          if (drinks) {
            //This checks if users is true and not equal to null or undefined.
            drinks = JSON.parse(drinks); //JSON.parse converts the string value into a Javascript object and is necessary because when items are added to localStorage they're stored as a string//
            drinks.push(newDrinkIngStorage); //This adds the new user objects to the array of existing users.
          } else {
            drinks = [newDrinkIngStorage]; //If there are no existing items callled user, then we create a new array as the user item.
          }
          localStorage.setItem("Drinks", JSON.stringify(drinks));
          console.log(drinks);
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

// API mealsDB

// user input - API meal categories: vegan, vegeterian, meat[beef, chicken, lamb, pork, goat], seafood, surprise me: mix them all up? only mixed vegan, vegeterian and seafood as meats are a pain

// Function to fetch meal data based on user input
function fetchMealData(category) {
  // Hook Meat user input into all meat options on the API [beef, chicken, lamb, pork, goat]
  if (category === "Meat") {
    // meat options on categories API
    let randomMeat = ["Beef", "Chicken", "Lamb", "Pork", "Goat"];
    // empty variable to store meat
    let chosenMeat;

    // randomise meat choices
    function getRandomValue() {
      let randomIndex = Math.floor(Math.random() * randomMeat.length);
      chosenMeat = randomMeat[randomIndex];
    }
    getRandomValue();

    let queryURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${chosenMeat}`;
    fetch(queryURL)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        let meals = response.meals;
        let randomIndex = Math.floor(Math.random() * meals.length);
        let randomMeal = meals[randomIndex];
        console.log(randomMeal);

        let mealId = randomMeal.idMeal;
        return fetch(
          `https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
      })
      .then((response) => response.json())
      .then((selectedMeal) => {
        // Render data
        renderMeal(selectedMeal.meals);
      });

    // Mix them all up (but no meats) and randomise for surprise me
  } else if (category === "Surprise Me") {
    const categories = ["Vegan", "Vegetarian", "Seafood"];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    console.log(randomCategory);
    fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${randomCategory}`)
      .then((response) => response.json())
      // This is the returned selected meal data (array of objects), function to randomly select one meal
      .then((response) => {
        let index = Math.floor(Math.random() * response.meals.length);
        console.log(index);
        let randomMeal = response.meals[index];
        console.log(randomMeal);

        let mealId = randomMeal.idMeal;
        return fetch(
          `https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
      })
      .then((response) => response.json())
      .then((selectedMeal) => {
        // Render Meal
        renderMeal(selectedMeal.meals);
      });
  } else {
    fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((response) => {
        let index = Math.floor(Math.random() * response.meals.length);
        let randomMeal = response.meals[index];

        // Render Data - create func for this
        let mealId = randomMeal.idMeal;
        return fetch(
          `https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
      })
      .then((response) => response.json())
      .then((selectedMeal) => {
        // Render Meal
        renderMeal(selectedMeal.meals);
      });
  }
}

// Hook user input into food buttons
vegan.addEventListener("click", () => fetchMealData("Vegan"));
vegeterian.addEventListener("click", () => fetchMealData("Vegetarian"));
seafood.addEventListener("click", () => fetchMealData("Seafood"));
surprise.addEventListener("click", () => fetchMealData("Surprise Me"));
meat.addEventListener("click", () => fetchMealData("Meat"));

// Function to render meal
function renderMeal(mealDetails) {
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

  // Render on the page
  let mealCard = document.querySelector("#meal-card");
  let mealName = mealDetails[0].strMeal;
  let mealImg = mealDetails[0].strMealThumb;
  let mealIngr = stringIngr;
  let mealInstr = mealDetails[0].strInstructions;
  let ingrQuant = stringMeasure;
  let ingredients = mealIngr
    .map((ingredient, index) => `<li>${ingredient}, ${ingrQuant[index]}</li>`)
    .join("");

  let htmlMealData = `<h1 class="card-title">${mealName}</h1>
   <img class="card-img-top" id="mealCardImg" alt="image of a meal" src='${mealImg}'>
   <h2 style="padding-left: 20px; margin-bottom: 20px;">Ingredients:</h2>
   <ul>${ingredients}</ul>
   <p style='font-size: 15px;'class="card-text">Instructions: ${mealInstr}</p>`;

  mealCard.innerHTML = htmlMealData;
  resultsContainer.classList.remove("hide");
  resultsContainer.classList.add("results-container");
  // Remove the Questions
  questionTitle.innerHTML = "";
  // Remove Buttons
  document.querySelector(".food-btns").innerHTML = "";
  let containerTextHtml = `<div class="save-quote"> <div style="text-align:center"><button class='save-button'><img class='save-icon'src="./assets/save.png" alt="save-icon">Save</button></div> <h2 class="message-quote">${message}</h2></div> `;
  container.innerHTML = containerTextHtml;
  setCardHeight();
}

let quotes = {
  angry: [
    "For every minute you remain angry, you give up sixty seconds of peace of mind. - R. W. Emerson",
    "When tempted to fight fire with fire, remember the fire department usually uses water. - Unknown",
    "The best fighter is never angry. - Lao Tzu",
    "A heart filled with anger has no room for love. - Joan Lunden",
    "Don’t waste your time in anger, regrets, worries, and grudges. Life is too short to be unhappy. ― Roy T. Bennett",
    "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured. - Mark Twain",
  ],
  happy: [
    "Whoever is happy will make others happy too. - Anne Frank",
    "Happiness depends upon ourselves. — Aristotle",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Remember this, that very little is needed to make a happy life. — Marcus Aurelius",
    "There is no path to happiness; happiness is the path. - Buddha",
    "No medicine cures what happiness cannot. - G. Garcia Marquez",
  ],
  sad: [
    "Some days are just bad days, that's all. You have to experience sadness to know happiness, and I remind myself that not every day is going to be a good day, that's just the way it is! - Dita Von Teese",
    "Be happy for this moment. This moment is your life. - Omar Khayyan",
    "Experiencing sadness and anger can make you feel more creative, and by being creative you can get beyond your pain or negativity. - Yoko Ono",
    "Sad hurts but it's a healthy feeling. It is a necessary thing to feel. - J.K. Rowling",
    "When you feel sad, it’s okay. It’s not the end of the world. - Mac Miller",
    "It doesn’t hurt to feel sad from time to time. - Willie Nelson",
  ],
  surprised: [
    "If you're changing the world, you're working on important things. You're excited to get up in the morning. - Larry Page",
    "Think in the morning. Act in the noon. Eat in the evening. Sleep in the night. - William Blake",
    "We don't always know what we're doing. We often just get excited, put something down, and say, 'Oh, neat'. - Tina Weymouth",
    "When I see old friends, I am very excited. - Chino Moreno",
    "Think excitement, talk excitement, act out excitement, and you are bound to become an excited person. - Norman Vincent Peale",
    "Stay excited and stay humble and good things will come. - Mark McMorris",
  ],
};

//Function for generating a random quote based on the selected mood.
let message;
landingPage.addEventListener("click", function (event) {
  let randomIndex = Math.floor(Math.random() * 2);
  let selectedQuote = event.target.id;
  console.log(selectedQuote);
  if (selectedQuote === "selectAngry") {
    message = quotes.angry[randomIndex];
  } else if (selectedQuote === "selectHappy") {
    message = quotes.happy[randomIndex];
  } else if (selectedQuote === "selectSad") {
    message = quotes.sad[randomIndex];
  } else if (selectedQuote === "selectSalsa") {
    message = quotes.surprised[randomIndex];
  }
  return message;
});

// / review this with a TA perhaps

// Results cards height to match the higher one

function setCardHeight() {
  const drinkCard = document.getElementById("drink-card");
  const mealCard = document.getElementById("meal-card");

  console.log(`mealCard height: ${mealCard.offsetHeight}`);

  window.requestAnimationFrame(() => {
    const cardHeight = mealCard.offsetHeight;

    console.log(`Setting drinkCard height to: ${cardHeight}`);

    drinkCard.style.height = cardHeight;
  });
}
