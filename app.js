import { getPokemon, } from "./data.js";
const pokemonCardCoainter = document.getElementById("pokemon-card-container");

const pokemongenerateButton = document.getElementById("generateButton");
const pokemonInput = document.getElementById("pokemon-input");
pokemonInput.addEventListener("change", async () => {
const pokemonId = pokemonInput.value.trim();

if (!isNaN(pokemonId)) { 
    if (pokemonId < 1 || pokemonId > 1025) {
      
        renderPokemonCard(null);
        alert("Ingresa un ID válido entre 1 y 1025");
        pokemonInput.value = "";
        return;
    }
}
  try {
    const pokemonData = await getPokemon(pokemonId);
    renderPokemonCard(pokemonData);
  } catch (error) {
    console.error("Error al obtener los datos del pokemon", error);
    renderPokemonCard(null);
  }

});

function renderPokemonCard(pokemonData) {
    if (!pokemonData) {
      pokemonCardCoainter.innerHTML = "";
      pokemonContainer.innerHTML = ""; 
      return;
    }
  
    const spritePokemonCard = pokemonData.sprites.front_default;
    //const spritePokemonCard2 = pokemonData.sprites.other.dream_world.front_default;
    const pName = pokemonData.name;
    const { stats, types, abilities,   } = pokemonData;
  
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");
  
    const pokemonImage = document.createElement("img");
    pokemonImage.src = spritePokemonCard;
    pokemonImage.alt = pName;

    
    const pokeId = document.createElement("h3");
    pokeId.textContent = `Nº ${pokemonData.id}`;
    pokeId.style.fontWeight = "bold";
    
  
    const pokemonName = document.createElement("h2");
    pokemonName.textContent = pName;
  
    const pokemonTypes1 = document.createElement("p");
    if (types.length > 1) {
    pokemonTypes1.innerHTML = `<strong>Tipo:</strong> ${types[0].type.name}, ${types[1].type.name} `;
    }else if (types.length==1){
        pokemonTypes1.innerHTML = `<strong>Tipo:</strong> ${types[0].type.name}`;
    }else {
        pokemonTypes1.innerHTML = "No es un Pokémon.";
    }


    const pokemonAbility = document.createElement("p");
    if (abilities.length > 1) {
        pokemonAbility.innerHTML = `<strong>Habilidades:</strong> ${abilities[0].ability.name}, ${abilities[1].ability.name}`;
    } else if (abilities.length === 1) {
        pokemonAbility.innerHTML = `<strong>Habilidad:</strong> ${abilities[0].ability.name}`;
    } else {
        pokemonAbility.innerHTML = "Este Pokémon no tiene habilidades.";
    }


    const Estadisticas = document.createElement("p");
    Estadisticas.textContent = ("Estadísticas:");
    Estadisticas.style.fontWeight = "bold";
    
    const pokemonStats1 = document.createElement("p");
    pokemonStats1.textContent = `Salud:             ${stats[0].base_stat}`;

    const pokemonStats2 = document.createElement("p");
    pokemonStats2.textContent = `Ataque:  ${stats[1].base_stat}`;

    const pokemonStats3 = document.createElement("p");
    pokemonStats3.textContent = `Defensa:  ${stats[2].base_stat}`;
    
    const pokemonStats4 = document.createElement("p");
    pokemonStats4.textContent = `Velocidad:  ${stats[5].base_stat}`;

   
    pokemonCard.appendChild(pokemonName);
    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(pokeId);
    pokemonCard.appendChild(pokemonTypes1);
    pokemonCard.appendChild(pokemonAbility);
    pokemonCard.appendChild(Estadisticas);
    pokemonCard.appendChild(pokemonStats1);
    pokemonCard.appendChild(pokemonStats2);
    pokemonCard.appendChild(pokemonStats3);
    pokemonCard.appendChild(pokemonStats4);
   
   
    pokemonCardCoainter.innerHTML = ""; // Limpiar el contenedor antes de agregar el nuevo pokemon
    pokemonCardCoainter.appendChild(pokemonCard);
    
    // const pokeName = pName;
    // for (let i = 0; i < 3; i++) {
      
    //   const pokemonImage2 = document.createElement("img");
    //   const randomPokemonId = Math.floor(Math.random() * 649) + 1;
    //   pokemonImage2.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${randomPokemonId}.svg`;
            
    
    //   console.log(name);
  
    //   pokemonImage2.alt = name;
    
      
    //    pokemonCard.appendChild(pokemonImage2);
      

    // }

   // Seleccionar el botón en el HTML por su ID

// Agregar un event listener al botón para que llame a la función cuando se haga clic
generateButton.addEventListener("click", async () => {
    // Lógica para generar las imágenes y nombres de Pokémon
    for (let i = 1; i <=5; i++) {
        // Obtener datos de un Pokémon aleatorio
        const randomPokemonId = Math.floor(Math.random() * 649) + 1;
        const pokemonData = await getPokemon(randomPokemonId);

        // Crear elementos para la tarjeta del Pokémon
        const pokemonCard = document.createElement("div");
        pokemonCard.classList.add("pokemon-card");
        const pokemonImage = document.createElement("img");
        const pokemonName = document.createElement("p");
        const pId = document.createElement("p");

        // Configurar los atributos de la imagen y el nombre del Pokémon
        pokemonImage.src = pokemonData.sprites.other.dream_world.front_default;
        pokemonImage.alt = pokemonData.name;
        pokemonName.textContent = pokemonData.name;
        pId.textContent = `Nº ${pokemonData.id}`;
         

        // Agregar la imagen y el nombre a la tarjeta del Pokémon
        pokemonCard.appendChild(pokemonImage);
        pokemonCard.appendChild(pokemonName);
        pokemonCard.appendChild(pId);
       

        //pokemonCardCoainter.innerHTML = ""; // Limpiar el contenedor antes de agregar el nuevo pokemon
        pokemonCardCoainter.appendChild(pokemonCard);
      
    }
}); 

}




pokemonInput.addEventListener("input", () => {
  renderPokemonCard(null); // No mostrar tarjeta
});


