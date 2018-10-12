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
const fighterDiv = $(`#fight`);
let defenderOneCard;
let defenderTwoCard;
let defenderThreeCard;


// Define game variables
//

let playerCharacter;
let enemyCharacters;
let currentFighter;
let isFighting = false;

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
    console.log(`enemy array: ${enemy[0]}`);
    charactersDiv.empty();
    charactersDiv.append(`<div id="char" class="character"><p>${player[0].name}</p><img src="${player[0].url}"><p>${player[0].hp}</p></div>`);
    let enemyCards = enemy.map((enemy, i) => {
        return defendersDiv.append(`<div id="defender${i}" class="character"><p>${enemy.name}</p><img src="${enemy.url}"><p>${enemy.hp}</p></div>`)
    });
    defenderOneCard = $(`#defender0`);
    defenderTwoCard = $(`#defender1`);
    defenderThreeCard = $(`#defender2`);

    if (isFighting === false) {
        defenderOneCard.click(() => {
            console.log(`clicked ${enemy[0].name}`);
            currentFighter = enemy.splice(0, 1);
            console.log(`current fighter: ${currentFighter[0].name}`);
            startFight(currentFighter,enemy);
            // isFighting = true;
            // fighterDiv.append(`<div id="currentFighter" class="character"><p>${currentFighter[0].name}</p><img src="${currentFighter[0].url}"><p>${currentFighter[0].hp}</p></div>`)
            // defendersDiv.empty();
            // setupCharacters(playerCharacter, enemy);
        });

        defenderTwoCard.click(() => {
            console.log(`clicked ${enemy[1].name}`);
            currentFighter = enemy.splice(1, 1);
            console.log(`current fighter: ${currentFighter[0].name}`);
            startFight(currentFighter,enemy);
            // isFighting = true;
            // fighterDiv.append(`<div id="currentFighter" class="character"><p>${currentFighter[0].name}</p><img src="${currentFighter[0].url}"><p>${currentFighter[0].hp}</p></div>`)
            // defendersDiv.empty();
            // setupCharacters(playerCharacter, enemy);
        });

        defenderThreeCard.click(() => {
            console.log(`clicked ${enemy[2].name}`);
            currentFighter = enemy.splice(2, 1);
            console.log(`current fighter: ${currentFighter[0].name}`);
            startFight(currentFighter,enemy)
            // isFighting = true;
            // fighterDiv.append(`<div id="currentFighter" class="character"><p>${currentFighter[0].name}</p><img src="${currentFighter[0].url}"><p>${currentFighter[0].hp}</p></div>`)
            // defendersDiv.empty();
            // setupCharacters(playerCharacter, enemy);
        });
    } //end ifFighting === false


    return enemyCards;
} // end setupCharacters

function startFight(fighter,enemy){
    isFighting = true;
    fighterDiv.append(`<div id="currentFighter" class="character"><p>${fighter[0].name}</p><img src="${fighter[0].url}"><p>${fighter[0].hp}</p></div>`);
    defendersDiv.empty();
    setupCharacters(playerCharacter,enemy)
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
    return setupCharacters(playerCharacter, enemyCharacters);
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

