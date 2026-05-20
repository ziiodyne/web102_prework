import GAMES_JSON from './games.js';

/*****************************************************************************
 * Challenge 2 & 3: Add all games from the JSON data to the page
 ******************************************************************************/

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
  for (let i = 0; i < games.length; i++) {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.innerHTML = `
      <img src="${games[i].img}" class="game-img" alt="${games[i].name}" />
      <h3>${games[i].name}</h3>
      <p>${games[i].description}</p>
      <p>Backers: ${games[i].backers}</p>
    `;
    gamesContainer.appendChild(gameCard);
  }
}

addGamesToPage(GAMES_JSON);

/*****************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page
 ******************************************************************************/

const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers;
}, 0);
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;

/*****************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 ******************************************************************************/

function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

function setActiveButton(activeBtn) {
  [unfundedBtn, fundedBtn, allBtn].forEach((btn) => {
    btn.classList.remove("active");
  });
  activeBtn.classList.add("active");
}

function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);
  setActiveButton(unfundedBtn);
  const unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });
  addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
  deleteChildElements(gamesContainer);
  setActiveButton(fundedBtn);
  const fundedGames = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal;
  });
  addGamesToPage(fundedGames);
}

function showAllGames() {
  deleteChildElements(gamesContainer);
  setActiveButton(allBtn);
  addGamesToPage(GAMES_JSON);
}

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*****************************************************************************
 * Challenge 6: Add more information at the top of the page about the company
 ******************************************************************************/

const descriptionContainer = document.getElementById("description-container");

const unfundedCount = GAMES_JSON.filter((game) => {
  return game.pledged < game.goal;
}).length;

const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. Currently, ${unfundedCount} ${unfundedCount === 1 ? "game remains" : "games remain"} unfunded. We need your help to fund these amazing games!`;

const descriptionParagraph = document.createElement("p");
descriptionParagraph.innerHTML = displayStr;
descriptionContainer.appendChild(descriptionParagraph);

/*****************************************************************************
 * Challenge 7: Select & display the top 2 games
 ******************************************************************************/

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

const [firstGame, secondGame, ...remainingGames] = sortedGames;

const firstGameName = document.createElement("p");
firstGameName.innerHTML = firstGame.name;
firstGameContainer.appendChild(firstGameName);

const secondGameName = document.createElement("p");
secondGameName.innerHTML = secondGame.name;
secondGameContainer.appendChild(secondGameName);