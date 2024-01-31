import { saveToLocalStorage, getLocalStorage, removeLocalStorage } from "./localStorage.js";

let userSearchInput = document.getElementById("userSearchInput");
let pokemonName = document.getElementById("pokemonName");
let pokemonId = document.getElementById("pokemonId");
let pokemonImg = document.getElementById("pokemonImg");
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
let conModal = document.getElementById("conModal");
let confirmBtn = document.getElementById("confirmBtn");
let cancelBtn = document.getElementById("cancelBtn");

let currentPokemonInfo = "";
let currentEvoultionPokemonInfo = "";
let pokemonNameDisplay = "";
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
let favPic = "./assets/Fav.png";
let nonFavPic = "./assets/Unfav.png";

const PokemonApiFetch = async (userInput) => {
    let PokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/${userInput}`;
    const promise = await fetch(PokemonApiUrl);
    const data = await promise.json();
    currentPokemonInfo = data;

    findFavoritePokemon();
    DisplayName();
    DisplayImg();
    DisplayElement();
    DisplayAbilities();
    DisplayMoves();
    DisplayLocation(currentPokemonInfo.location_area_encounters);

}
const findFavoritePokemon = () => {
    let savedName = CapitalFirstLetter(currentPokemonInfo.forms[0].name);
    let savedNumber = currentPokemonInfo.id;
    let savedPokemon = `#${savedNumber} : ${savedName}`;

    if (getLocalStorage().includes(savedPokemon)) {
        pokemonFavorite.src = favPic;
    } else {
        pokemonFavorite.src = nonFavPic;
    }
}

const SpeciesPokemonApiFetch = async (userInput) => {
    let PokemonApiUrl = `https://pokeapi.co/api/v2/pokemon-species/${userInput}`;
    const promise = await fetch(PokemonApiUrl);
    const data = await promise.json();
    currentEvoultionPokemonInfo = data;

    EvolutionApiFetch(currentEvoultionPokemonInfo.evolution_chain.url);
    BackgroundColor(currentEvoultionPokemonInfo.color.name);
}

const EvolutionApiFetch = async (input) => {
    pokemonEvolutionChain = [];
    const promise = await fetch(input);
    const data = await promise.json();
    currentEvolutionChain = data;

    pokemonEvolutionChain.push(currentEvolutionChain.chain.species.name);
    if (currentEvolutionChain.chain.evolves_to != null) {
        currentEvolutionChain.chain.evolves_to.map(e => pokemonEvolutionChain.push(e.species.name));
        if (currentEvolutionChain.chain.evolves_to.length != 0 && currentEvolutionChain.chain.evolves_to.length != 0) {
            currentEvolutionChain.chain.evolves_to[0].evolves_to.map(e => pokemonEvolutionChain.push(e.species.name))
        }
    }
    DisplayEvolution();
}

const DisplayEvolution = async () => {
    evolutionDiv.innerHTML = "";

    for (let i = 0; i < pokemonEvolutionChain.length; i++) {
        let evolutionName = pokemonEvolutionChain[i];
        let div = document.createElement("div");
        div.classList.add("col-span-3", "lg:col-span-1", "grid", "justify-center", "mb-[30px]");
        let evolutionData = await PokemonEvolutionImageName(evolutionName);
        let imgLink = evolutionData.sprites.other["official-artwork"].front_default;
        let pokemonId = evolutionData.id;

        let img = document.createElement("img");
        img.src = imgLink;
        img.classList.add("rounded-[200px]", "border-white", "border-[5px]", "w-[200px]", "h-[200px]", "drop-shadow-lg", "cursorImg");

        img.addEventListener("click", () => {
            PokemonApiFetch(evolutionName);
            SpeciesPokemonApiFetch(evolutionName);
        });

        let nameP = document.createElement("p");
        nameP.textContent = CapitalFirstLetter(evolutionName);
        nameP.classList.add("font-[Orbitron-Bold]", "text-[1.875rem]", "text-center", "text-white");

        let idP = document.createElement("p");
        idP.textContent = `#${pokemonId}`;
        idP.classList.add("font-[Orbitron-Bold]", "text-[1.875rem]", "text-center", "text-[#A4ACAF]");

        div.appendChild(img);
        div.appendChild(nameP);
        div.appendChild(idP);

        evolutionDiv.appendChild(div);
    }
};

const PokemonEvolutionImageName = async (userInput) => {
    let PokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/${userInput}`;
    const promise = await fetch(PokemonApiUrl);
    const data = await promise.json();
    return data;
};

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
    let words = userInput.split("-");
    let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    let formattedInput = capitalizedWords.join(" ");

    return formattedInput;
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

pokemonImg.addEventListener("click", () => {
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

randomPokemonTwo.addEventListener('click', () => {
    let randomPokemonNumber = RandomPokemon(1, 1025);
    PokemonApiFetch(randomPokemonNumber);
    SpeciesPokemonApiFetch(randomPokemonNumber);
})

pokemonFavorite.addEventListener("click", (event) => {
    event.stopPropagation();

    let saveName = CapitalFirstLetter(currentPokemonInfo.forms[0].name);
    let saveNumber = currentPokemonInfo.id;
    let save = `#${saveNumber} : ${saveName}`;

    let favorites = getLocalStorage() || [];

    if (favorites.includes(save)) {
        removeLocalStorage(save);
        pokemonFavorite.src = nonFavPic;
    } else {
        saveToLocalStorage(save);
        pokemonFavorite.src = favPic;
    }
})

getFavoriteBtn.addEventListener("click", () => {
    let favorites = getLocalStorage();
    getFavoritesDiv.textContent = "";

    favorites.map(pokemonName => {
        let div = document.createElement('div');
        div.className = "flex justify-between flex-row";

        let p = document.createElement('p');
        p.textContent = pokemonName;
        p.classList.add(
            "font-[Orbitron-Bold]",
            "text-black",
            "dark:text-white",
            "bg-white", 
            "w-full",
            "rounded-l-lg",
            "px-2",
            "favoriteSpacing",
            "cursor-pointer");


        p.addEventListener("click", () => {
            let id = parseInt(pokemonName.split(" ")[0].substring(1));
            PokemonApiFetch(id);
            SpeciesPokemonApiFetch(id);
        });

        let button = document.createElement("button");
        button.type = "button";
        button.textContent = "X";

        button.classList.add(
            "text-white",
            "bg-[#FF1C1C]",
            "hover:bg-gray-200",
            "hover:text-gray-900",
            "rounded-r-lg",
            "px-5",
            "favoriteSpacing",
            "dark:hover:bg-gray-600",
            "dark:hover:text-white",
            "h-full",
        );

        button.addEventListener("click", () => {

            conModal.style.display = "block";

            confirmBtn.addEventListener("click", () => {
                removeLocalStorage(pokemonName);
                div.remove();

                let savedName = CapitalFirstLetter(currentPokemonInfo.forms[0].name);
                let savedNumber = currentPokemonInfo.id;
                let savedPokemon = `#${savedNumber} : ${savedName}`;
                if (pokemonName === savedPokemon) {
                    pokemonFavorite.src = nonFavPic;
                }

                conModal.style.display = "none";
            });

            cancelBtn.addEventListener("click", () => {
                conModal.style.display = "none";
            });
        });

        div.appendChild(p);
        div.appendChild(button);
        getFavoritesDiv.appendChild(div);
    });
});



const loadPikachu = () => {
    PokemonApiFetch("pikachu");
    SpeciesPokemonApiFetch("pikachu");
}

document.addEventListener("DOMContentLoaded", () => {
    loadPikachu();
});

