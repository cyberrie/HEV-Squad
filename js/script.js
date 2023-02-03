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
    }
  });
});

// API check mealsDB

// user input - meal categories: vegan, vegeterian, meat[beef, chicken, lamb, pork, goat], seafood, surprise me: mix them all up?

// Function to fetch meal data based on user input
function fetchMealData(category) {
  // Hook Meat user input into all meat options on the API [beef, chicken, lamb, pork, goat]
  if (category === "Meat") {
    fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=Beef`)
      .then((response) => response.json())
      .then((beefData) => {
        fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=Chicken`)
          .then((response) => response.json())
          .then((chickenData) => {
            fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=Lamb`)
              .then((response) => response.json())
              .then((lambData) => {
                fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=Pork`)
                  .then((response) => response.json())
                  .then((porkData) => {
                    fetch(
                      `https://themealdb.com/api/json/v1/1/filter.php?c=Goat`
                    )
                      .then((response) => response.json())
                      .then((goatData) => {
                        // create and array of all meat options
                        let meatOptions = [
                          beefData,
                          chickenData,
                          lambData,
                          porkData,
                          goatData,
                        ];
                        // randomly generate one meat meal only from the array of meat options
                        let index = Math.floor(
                          Math.random() * meatOptions.length
                        );
                        let randomMeal =
                          meatOptions[index].meals[
                            Math.floor(
                              Math.random() * meatOptions[index].meals.length
                            )
                          ];
                        console.log(randomMeal);
                      });
                  });
              });
          });
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
      .then((mealData) => {
        let index = Math.floor(Math.random() * mealData.meals.length);
        let generatedMeal = mealData.meals[index];
        console.log(generatedMeal);
      });
  } else {
    fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((mealData) => {
        let index = Math.floor(Math.random() * mealData.meals.length);
        let generatedMeal = mealData.meals[index];
        console.log(generatedMeal);
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

// function renderMeal(mealData) {

//   let selectedMeal =
// }
