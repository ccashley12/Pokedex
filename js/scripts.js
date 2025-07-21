(function () {
    const pokemonList = [];
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    // Function to show details of Pokémon in modals
    function showModal(item) {
        const modalBody = $(".modal-body");
        const modalTitle = $(".modal-title");

        // clear existing content of the modal
        modalBody.empty();
        modalTitle.empty();

        // creating element for name in modal content
        const nameElement = $(`<h1>${item.name}</h1>`);
        // creating img in modal content
        const imageElementFront = $(`<img class="modal-img" src="${item.imageUrlFront}">`);
        const imageElementBack = $(`<img class="modal-img" src="${item.imageUrlBack}">`);
        // creating height element in modal content
        const heightElement = $(`<p>Height : ${item.height}</p>`);
        // creating type element in modal content
        const typesElement = $(`<p>Types : ${item.types}</p>`);
        // creating abilities element in modal content
        const abilitiesElement = $(
            `<p>Abilities : ${item.abilities}</p>`
        );

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
    }

    // Function to add Pokémon to the list
    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    // Function to return list of all Pokémon
    function getAll() {
        return pokemonList;
    }

    // Function to render the Pokemon list
    function displayPokemonList(list) {
        const pokemonListElement = document.querySelector('.pokemon-list');
        pokemonListElement.innerHTML = ''; // Clear list before re-rendering
      
        list.forEach((pokemon) => {
          const listItem = document.createElement("li");
          listItem.classList.add("list-group-item");
          listItem.innerText = pokemon.name;
      
          listItem.addEventListener("click", () => {
            showDetails(pokemon);
            $("#exampleModal").modal("show");
          });
      
          pokemonListElement.appendChild(listItem);
        });
    }
      

    // Function to fetch and load Pokémon list from API
    async function loadList() {
        try {
            const response = await fetch(apiUrl);
            const json = await response.json();
            json.results.forEach(function (item) {
                const pokemonDetails = {
                    name: item.name,
                    detailsUrl: item.url,
                    height: item.height,
                    type: item.types,
                };
                add(pokemonDetails);
                console.log(pokemonDetails);
            });
        } catch (e) {
            console.error(e);
        }
    }

    // Function to fetch and load details for specific Pokémon
    async function loadDetails(pokemon) {
        const url = pokemon.detailsUrl;
        try {
            const response = await fetch(url);
            const details = await response.json();
            pokemon.imageUrlFront = details.sprites.front_default;
            pokemon.imageUrlBack = details.sprites.back_default;
            pokemon.height = details.height;
            pokemon.types = details.types.map((type) => type.type.name);
            pokemon.abilities = details.abilities.map(
                (ability) => ability.ability.name);
        } catch (e) {
            console.error(e);
        }
    }

    // Function to show details of a Pokémon and show modal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            showModal(pokemon);
        });
    }

    $('#exampleModal').on('hidden.bs.modal', function (e) {
        const modalBody = $(".modal-body");
        const modalTitle = $(".modal-title");

        // clear existing content of the modal
        modalBody.empty();
        modalTitle.empty();
    });

    // Fetch and load Pokémon list and create list items for each Pokémon
    loadList().then(() => {
        const pokemonList = getAll();
        displayPokemonList(pokemonList);
    });

    // Search functionality
    document.getElementById('search-bar').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPokemon = getAll().filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm)
        );
        displayPokemonList(filteredPokemon);
      });

})();
