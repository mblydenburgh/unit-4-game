const characters = [
    {
        name: "Obi-Wan Kenobi",
        hp: 120,
        attack: 8,
        attackAdd: 8,
        counter: 8,
        url: "assets/images/obiwan.jpg"
    },
    {
        name: "Luke Skywalker",
        hp: 100,
        attack: 5,
        attackAdd: 5,
        counter: 5,
        url: "assets/images/luke.jpg"
    },
    {
        name: "Darth Maul",
        hp: 180,
        attack: 5,
        attackAdd: 5,
        counter: 25,
        url: "assets/images/maul.jpeg"
    },
    {
        name: "Darth Vader",
        hp: 150,
        attack: 6,
        attackAdd: 6,
        counter: 20,
        url: "assets/images/vader.jpg"
    },
];

//Define jQuery selectors
//

const charactersDiv = $('#characters');
const defendersDiv = $('#defenderDisplay');
const fighterDiv = $(`#fight`);
const attackButton = $(`#attackButton`);
const theRingDiv = $(`#theRing`);
const battleLogDiv = $(`#battle-log`);
let defenderOneCard;
let defenderTwoCard;
let defenderThreeCard;
let currentFighter;


// Define game variables
//

let playerCharacter;
let enemyCharacters;
let isFighting = false;

// Define game functions
//

// dynamically creates characters to choose based on characters array of objects
function createCard(char, i) {
    let characterCard = $(`<div id="char${i}" class="character"><p>${char.name}</p><img src="${char.url}"><p>hp:${char.hp}</p></div>`);
    return charactersDiv.append(characterCard);

}


//note: ask why the [0] index is needed for player
//once player selects a character, the chosen character remains in the characters div, while the remaining characters are moved to the defender area
function setupCharacters(player, enemy) {
    console.log(`setupCharacters running...`)
    console.log(`player: ${player[0].name}`);
    for (let i = 0; i < enemy.length; i++) {
        console.log(`enemy array: ${enemy[i].name}`);
    }
    charactersDiv.empty();
    defendersDiv.empty();
    charactersDiv.append(`<div id="char" class="character"><p>${player[0].name}</p><img src="${player[0].url}"><p>hp:${player[0].hp}</p></div>`);
    let enemyCards = enemy.map((enemy, i) => {
        return defendersDiv.append(`<div id="defender${i}" class="character"><p>${enemy.name}</p><img src="${enemy.url}"><p>hp:${enemy.hp}</p></div>`)
    });

    defenderOneCard = $(`#defender0`);
    defenderTwoCard = $(`#defender1`);
    defenderThreeCard = $(`#defender2`);

    if (isFighting === false) {
        defenderOneCard.click(() => {
            console.log(`clicked ${enemy[0].name}`);
            currentFighter = enemy.splice(0, 1);
            for (let i = 0; i < enemy.length; i++) {
                console.log(`enemy-${i}: ${enemy[i].name}`)
            }
            console.log(`current fighter: ${currentFighter[0].name}`);
            console.log(`playerCharacter: ${playerCharacter[0].name}`);
            startFight(playerCharacter, currentFighter, enemy);

        });

        defenderTwoCard.click(() => {
            console.log(`clicked ${enemy[1].name}`);
            currentFighter = enemy.splice(1, 1);
            console.log(`current fighter: ${currentFighter[0].name}`);
            startFight(playerCharacter, currentFighter, enemy);

        });

        defenderThreeCard.click(() => {
            console.log(`clicked ${enemy[2].name}`);
            currentFighter = enemy.splice(2, 1);
            console.log(`current fighter: ${currentFighter[0].name}`);
            startFight(playerCharacter, currentFighter, enemy)

        });
    } //end ifFighting === false


    //return enemyCards;
} // end setupCharacters

function startFight(player, fighter, enemy) {
    console.log(fighter);
    console.log(`startFight running with fighter: ${fighter[0].name}`)
    isFighting = true;
    theRingDiv.append(`<div id="currentFighter" class="character"><p>${fighter[0].name}</p><img src="${fighter[0].url}"><p>hp:${fighter[0].hp}</p></div>`);
    currentFighter = $(`#currentFighter`);
    defendersDiv.empty();
    setupCharacters(player, enemy);
    attackButton.click(() => {
        //Display the results of this turn's attacks
        console.log(`clicked attack`);
        battleLogDiv.html(`<p>You attack ${fighter[0].name} for ${player[0].attack} damage</p><p>${fighter[0].name} attacks you for ${fighter[0].counter}</p>`);

        //for each attack, subtract attack and counter from character HP, increase player attack by their attack value
        player[0].hp -= fighter[0].counter;
        fighter[0].hp -= player[0].attack;
        player[0].attack += player[0].attackAdd;

        //updateFighterDisplay(player, fighter, enemy);

        //update DOM with new HP values
        if (player[0].hp < 0) {
            //display lose
            console.log(`You have died, you bring great dishonor to your family`);
            updateFighterDisplay(player, fighter, enemy);
            charactersDiv.append(`<br><button id="restartBtn">Restart</button>`);
            $('#restartBtn').click(() => { location.reload() });
            battleLogDiv.empty();
            battleLogDiv.append(`${player[0].name} has died a horrible death`);
            attackButton.attr("disabled", "disabled");
        } else if (fighter[0].hp < 0) {
            //display win
            console.log(`You have defeated ${fighter[0].name}!`);
            updateFighterDisplay(player, fighter, enemy);
            isFighting = false;
            if (enemy.length > 0) {
                setupCharacters(player, enemy);
                attackButton.off();
            }else{
                battleLogDiv.empty();
                battleLogDiv.html(`<p>The force is strong in you, ${player[0].name}</p>`)
                attackButton.off();
            }
            //setupCharacters(player, enemy);
            // attackButton.off();
        } else {
            console.log(`player or computer hp > 0, fight again`);
            //update character hp
            console.log(`running updateFighterDisplay with player:${player[0].name}, fighter:${fighter[0].name}, enemyArr:${enemy}`);
            updateFighterDisplay(player, fighter, enemy);
        }


    }); //end fight button click
}

function updateFighterDisplay(player, fighter, enemy) {
    console.log(`updateFighterDisplay running with player:${player[0].name}, fighter:${fighter[0].name}`);
    for (let i = 0; i < enemy.length; i++) {
        console.log(`enemy${i}:${enemy[i].name}`)
    };
    if (fighter[0].hp < 0) { //remove fighter card from ringDiv, update player HP
        console.log(`updateFighterDisplay fighter hp < 0 block running...`);
        theRingDiv.empty();
        battleLogDiv.empty();
        battleLogDiv.prepend(`<p>You have owned ${fighter[0].name}, select another fighter to slap</p>`);

    } else { //keep fighter card, update fighter and player HP
        console.log(`${fighter[0].name} hp > 0`)
        charactersDiv.empty();
        charactersDiv.append(`<div id="char" class="character"><p>${player[0].name}</p><img src="${player[0].url}"><p>hp:${player[0].hp}</p></div>`);
        theRingDiv.empty();
        theRingDiv.append(`<div id="currentFighter" class="character"><p>${fighter[0].name}</p><img src="${fighter[0].url}"><p>hp:${fighter[0].hp}</p></div>`);
    }
}


//End game functions definitions

// Create the character cards for player to choose by looping over the characters array
// and updating DOM with setupCharacters function.

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