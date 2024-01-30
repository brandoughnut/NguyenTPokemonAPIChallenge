import { saveToLocalStorage, getLocalStorage, removeLocalStorage } from "./localStorage.js";

let userSearchInput = document.getElementById("userSearchInput");
let pokemonName = document.getElementById("pokemonName");
let pokemonId = document.getElementById("pokemonId");
let pokemonImg = document.getElementById("pokemonImg");
let clickShiny = document.getElementById("clickShiny");
let elementType = document.getElementById("elementType");
let abilitiesText = document.getElementById("abilitiesText");
let movesText = document.getElementById("movesText");
let locationText = document.getElementById("locationText");
let randomPokemon = document.getElementById("randomPokemon");
let pokemonColorBack = document.getElementById("pokemonColorBack");
let pokemonFavorite = document.getElementById("pokemonFavorite");
let getFavoriteBtn = document.getElementById("getFavoriteBtn");
let getFavoritesDiv = document.getElementById("getFavoritesDiv");
let evolutionDiv = document.getElementById("evolutionDiv");
let randomPokemonTwo = document.getElementById("randomPokemonTwo");
let abilityColor = document.getElementById("abilityColor");
let locationColor = document.getElementById("locationColor");
let movesColor = document.getElementById("movesColor");
let evolutionColors = document.getElementById("evolutionColors");

let currentPokemonInfo = "";
let currentEvoultionPokemonInfo = "";
let pokemonNameDisplay = "";
let capitalWord = "";
let pokemonIdDisplay = "";
let pokemonImgDisplay = "";
let pokemonImgShinyDisplay = "";
let pokemonElementArray = [];
let pokemonAbilitiesArray = [];
let pokemonMovesArray = [];
let currentLocation = "";
let currentLocation2 = "";
let currentEvolutionChain = "";
let pokemonEvolutionChain = [];
let pokemonLocationData = "";

const PokemonApiFetch = async (userInput) => {
    let PokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/${userInput}`;
    const promise = await fetch(PokemonApiUrl);
    const data = await promise.json();
    currentPokemonInfo = data;
    console.log();

    findFavoritePokemon();
    DisplayName();
    DisplayImg();
    DisplayElement();
    DisplayAbilities();
    DisplayMoves();
    DisplayLocation(currentPokemonInfo.location_area_encounters);

}



const DisplayName = () => {
    pokemonNameDisplay = currentPokemonInfo.forms[0].name;
    pokemonIdDisplay = currentPokemonInfo.id;
    pokemonName.textContent = CapitalFirstLetter(pokemonNameDisplay);
    pokemonId.textContent = "#" + pokemonIdDisplay;
}

const DisplayImg = () => {
    pokemonImgDisplay = currentPokemonInfo.sprites.other["official-artwork"].front_default;
    pokemonImg.src = pokemonImgDisplay;
}

const DisplayImgShiny = () => {
    pokemonImgShinyDisplay = currentPokemonInfo.sprites.other["official-artwork"].front_shiny;
    pokemonImg.src = pokemonImgShinyDisplay
}

const CapitalFirstLetter = (userInput) => {
    capitalWord = userInput.charAt(0).toUpperCase() + userInput.slice(1);
    return capitalWord;
}

const DisplayElement = () => {
    pokemonElementArray = [];
    currentPokemonInfo.types.map(e => pokemonElementArray.push(e.type.name));
    console.log(pokemonElementArray);
    for (let i = 0; i < pokemonElementArray.length; i++) {
        pokemonElementArray[i] = CapitalFirstLetter(pokemonElementArray[i]);
    }
    elementType.textContent = "Type : " + pokemonElementArray.join(", ")
}

const DisplayAbilities = () => {
    pokemonAbilitiesArray = [];
    currentPokemonInfo.abilities.map(e => pokemonAbilitiesArray.push(e.ability.name));
    for (let i = 0; i < pokemonAbilitiesArray.length; i++) {
        pokemonAbilitiesArray[i] = CapitalFirstLetter(pokemonAbilitiesArray[i]);
    }
    abilitiesText.textContent = pokemonAbilitiesArray.join(", ");

}

const DisplayMoves = () => {
    pokemonMovesArray = [];
    currentPokemonInfo.moves.map(e => pokemonMovesArray.push(e.move.name));
    for (let i = 0; i < pokemonMovesArray.length; i++) {
        pokemonMovesArray[i] = CapitalFirstLetter(pokemonMovesArray[i]);
    }
    movesText.textContent = pokemonMovesArray.join(", ");
}

const DisplayLocation = async (input) => {
    const promise = await fetch(input);
    const data = await promise.json();
    currentLocation = data;
    if (data.length == 0) {
        pokemonLocationData = "N/A";
        locationText.textContent = pokemonLocationData;
    } else {
        LocationApi(currentLocation[0].location_area.url);
    }
}
const LocationApi = async (input) => {
    const promise = await fetch(input);
    const data = await promise.json();
    currentLocation = data.names[0].name;
    currentLocation2 = data.names[1].name;
    locationText.textContent = currentLocation + ", " + currentLocation2;

}

const RandomPokemon = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}


const BackgroundColor = (pokemonColorBg) => {
    switch (pokemonColorBg) {
        case "yellow":
            pokemonColorBack.style.backgroundColor = "#F8D030";
            abilityColor.style.color = "#F8D030";
            locationColor.style.color = "#F8D030";
            movesColor.style.color = "#F8D030";
            evolutionColors.style.color = "#F8D030";
            break;
        case "black":
            pokemonColorBack.style.backgroundColor = "#705848"
            abilityColor.style.color = "#705848"
            locationColor.style.color = "#705848"
            movesColor.style.color = "#705848"
            evolutionColors.style.color = "#705848"
            break;
        case "brown":
            pokemonColorBack.style.backgroundColor = "#A7A879"
            abilityColor.style.color = "#A7A879"
            locationColor.style.color = "#A7A879"
            movesColor.style.color = "#A7A879"
            evolutionColors.style.color = "#A7A879"
            break;
        case "gray":
            pokemonColorBack.style.backgroundColor = "#B8B8D0"
            abilityColor.style.color = "#B8B8D0"
            locationColor.style.color = "#B8B8D0"
            movesColor.style.color = "#B8B8D0"
            evolutionColors.style.color = "#B8B8D0"
            break;
        case "green":
            pokemonColorBack.style.backgroundColor = "#78C850"
            abilityColor.style.color = "#78C850"
            locationColor.style.color = "#78C850"
            movesColor.style.color = "#78C850"
            evolutionColors.style.color = "#78C850"
            break;
        case "pink":
            pokemonColorBack.style.backgroundColor = "#F85889"
            abilityColor.style.color = "#F85889"
            locationColor.style.color = "#F85889"
            movesColor.style.color = "#F85889"
            evolutionColors.style.color = "#F85889"
            break;
        case "purple":
            pokemonColorBack.style.backgroundColor = "#A890F0"
            abilityColor.style.color = "#A890F0"
            locationColor.style.color = "#A890F0"
            movesColor.style.color = "#A890F0"
            evolutionColors.style.color = "#A890F0"
            break;
        case "red":
            pokemonColorBack.style.backgroundColor = "#F08030"
            abilityColor.style.color = "#F08030"
            locationColor.style.color = "#F08030"
            movesColor.style.color = "#F08030"
            evolutionColors.style.color = "#F08030"
            break;
        case "white":
            pokemonColorBack.style.backgroundColor = "#705998"
            abilityColor.style.color = "#705998"
            locationColor.style.color = "#705998"
            movesColor.style.color = "#705998"
            evolutionColors.style.color = "#705998"
            break;
        case "blue":
            pokemonColorBack.style.backgroundColor = "#6890F0"
            abilityColor.style.color = "#6890F0"
            locationColor.style.color = "#6890F0"
            movesColor.style.color = "#6890F0"
            evolutionColors.style.color = "#6890F0"
            break;
        default:
            pokemonColorBack.style.backgroundColor = "#F8D030"
            abilityColor.style.color = "#F8D030"
            locationColor.style.color = "#F8D030"
            movesColor.style.color = "#F8D030"
            evolutionColors.style.color = "#F8D030"

    }
}
userSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        PokemonApiFetch(userSearchInput.value.toLowerCase());
        SpeciesPokemonApiFetch(userSearchInput.value.toLowerCase());
        userSearchInput.value = "";
    }
})

clickShiny.addEventListener("click", () => {
    if (pokemonImg.src === pokemonImgDisplay) {
        DisplayImgShiny();

    } else {
        DisplayImg();
    }
})

randomPokemon.addEventListener("click", () => {
    let randomPokemonNumber = RandomPokemon(1, 1025);
    PokemonApiFetch(randomPokemonNumber);
    SpeciesPokemonApiFetch(randomPokemonNumber);
})

randomPokemonTwo.addEventListener('click', () =>{
    let randomPokemonNumber = RandomPokemon(1, 1025);
    PokemonApiFetch(randomPokemonNumber);
    SpeciesPokemonApiFetch(randomPokemonNumber);
})
let favPic = "./assets/Fav.png";
let nonFavPic = "./assets/Unfav.png";




