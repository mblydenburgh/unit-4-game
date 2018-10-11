const characters = [
    {
        name: "Obi-Wan Kenobi",
        hp: 120,
        attack: 8,
        counter: 20,
        url: "assets/images/obiwan.jpg"
    },
    {
        name: "Luke Skywalker",
        hp: 100,
        attack: 8,
        counter: 20,
        url: "assets/images/luke.jpg"
    },
    {
        name: "Darth Maul",
        hp: 180,
        attack: 5,
        counter: 25,
        url: "assets/images/maul.jpeg"
    },
    {
        name: "Darth Vader",
        hp: 150,
        attack: 6,
        counter: 20,
        url: "assets/images/vader.jpg"
    },
];

//Define jQuery selectors
//

const charactersDiv = $('#characters');
const defendersDiv = $('#defender');


// Define game variables
//

let playerCharacter;
let enemyCharacters;

// Define game functions
//

// dynamically creates characters to choose based on characters array of objects
function createCard(char, i) {
    let characterCard = $(`<div id="char${i}" class="character"><p>${char.name}</p><img src="${char.url}"><p>${char.hp}</p></div>`);
    return charactersDiv.append(characterCard);

}


//note: ask why the [0] index is needed for player
//once player selects a character, the chosen character remains in the characters div, while the remaining characters are moved to the defender area
function setupCharacters(player, enemy) {
    console.log(player[0]);
    console.log(enemy);
    charactersDiv.empty();
    charactersDiv.append(`<div id="char" class="character"><p>${player[0].name}</p><img src="${player[0].url}"><p>${player[0].hp}</p></div>`);
    let enemyCards = enemy.map((enemy, i) => {
        return defendersDiv.append(`<div id="defender${i}" class="character"><p>${enemy.name}</p><img src="${enemy.url}"><p>${enemy.hp}</p></div>`)
    });
}

// Create the character cards for player to choose by looping over the characters array
//

let characterCards = characters.map((char, i) => {
    return createCard(char, i);
});

// Create listen events to select character
//
const obiWanCard = $('#char0');
const lukeCard = $('#char1');
const maulCard = $('#char2');
const sidiousCard = $('#char3');

obiWanCard.click(() => {
    console.log(`clicked ${characters[0].name}`);
    playerCharacter = characters.splice(0, 1);
    //console.log(`player: ${playerCharacter}`)
    enemyCharacters = characters;
    //console.log(`enemies: ${characters}`)
    //console.log(playerCharacter);
    setupCharacters(playerCharacter, enemyCharacters);
});

lukeCard.click(() => {
    console.log(`clicked ${characters[1].name}`);
    playerCharacter = characters.splice(1, 1);
    enemyCharacters = characters;
    setupCharacters(playerCharacter, enemyCharacters);
});

maulCard.click(() => {
    console.log(`clicked ${characters[2].name}`);
    playerCharacter = characters.splice(2, 1);
    enemyCharacters = characters;
    setupCharacters(playerCharacter, enemyCharacters);
});

sidiousCard.click(() => {
    console.log(`clicked ${characters[3].name}`);
    playerCharacter = characters.splice(3, 1);
    enemyCharacters = characters;
    setupCharacters(playerCharacter, enemyCharacters);
});

//List events for newly created defender cards
//
