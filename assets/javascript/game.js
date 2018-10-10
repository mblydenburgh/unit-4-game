const characters = [
    {name: "Obi-Wan Kenobi",
     hp:120,
     attack:8,
     counter:20,
     url:"assets/images/obiwan.jpg"
    },
    {name: "Luke Skywalker",
     hp:100,
     attack:8,
     counter:20,
     url:"assets/images/luke.jpg"
    },
    {name: "Darth Maul",
     hp:180,
     attack:5,
     counter:25,
     url:"assets/images/maul.jpeg"
    },
    {name: "Darth Sidious",
     hp:150,
     attack:6,
     counter:20,
     url:"assets/images/sidious.png"
    },
];

//Define jQuery selectors
//

let charactersDiv = $('#characters');


// Define game variables
//

let playerCharacter;
let enemyCharacter;

// Define game functions
//

function createCard(char,i){
    let title = $(`<div id="char${i}" class="character"><p>${char.name}</p><img src="${char.url}"><p>${char.hp}</p></div>`);
    return charactersDiv.append(title);

}

// Create the character cards for player to choose
//

let characterCards = characters.map((char,i)=>{
    return createCard(char,i);
})

// Create listen events to select character
//
let obiWanCard = $('#char0');
let lukeCard = $('#char1');
let maulCard = $('#char2');
let sidiousCard = $('#char3');


obiWanCard.click(()=>{
    console.log(`clicked ${characters[0].name}`);
    playerCharacter = characters[0];
    //console.log(playerCharacter);
});

lukeCard.click(()=>{
    console.log(`clicked ${characters[1].name}`);
    playerCharacter = characters[1];
});

maulCard.click(()=>{
    console.log(`clicked ${characters[2].name}`);
    playerCharacter = characters[2];
});

sidiousCard.click(()=>{
    console.log(`clicked ${characters[3].name}`);
    playerCharacter = characters[3];
})