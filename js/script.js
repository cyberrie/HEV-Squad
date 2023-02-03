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

// addEventListener to foodBtn
