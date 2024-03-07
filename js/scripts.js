let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    // Function to show details of Pokémon in modals
    function showModal(item) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");

        // clear existing content of the modal
        // modalBody.empty();
        // modalTitle.empty();

        // creating element for name in modal content
        let nameElement = $("<h1>" + item.name + "</h1>");
        // creating img in modal content
        let imageElementFront = $('<img class="modal-img" style="width:50%">');
        imageElementFront.attr("src", item.imageUrlFront);
        let imageElementBack = $('<img class="modal-img" style="width:50%">');
        imageElementBack.attr("src", item.imageUrlBack);
        // creating height element in modal content
        let heightElement = $("<p>" + "Height : " + item.height + "</p>");
        // creating type element in modal content
        let typesElement = $("<p>" + "Types : " + item.types + "</p>");
        // creating abilities element in modal content
        let abilitiesElement = $(
            "<p>" + "Abilities : " + item.abilities + "</p>",
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

    // Function to fetch and load Pokémon list from API
    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemonDetails = {
                        name: item.name,
                        detailsUrl: item.url,
                        height: item.height,
                        type: item.types,
                    };
                    add(pokemonDetails);
                    console.log(pokemonDetails);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    // Function to fetch and load details for specific Pokémon
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                pokemon.imageUrlFront = details.sprites.front_default;
                pokemon.imageUrlBack = details.sprites.back_default;
                pokemon.height = details.height;
                pokemon.types = details.types.map((type) => type.type.name);
                pokemon.abilities = details.abilities.map(
                    (ability) => ability.ability.name,
                );
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    // Function to show details of a Pokémon and show modal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            showModal(pokemon);
        });
    }

    $('#exampleModal').on('hidden.bs.modal', function (e) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");

        // clear existing content of the modal
        modalBody.empty();
        modalTitle.empty();
      })

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
})();

// Fetch and load Pokémon list and create list items for each Pokémon
pokemonRepository.loadList().then(() => {
    let pokemonList = pokemonRepository.getAll();
    pokemonList.forEach((pokemon) => {
        // Create list item for each Pokemon
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.innerText = pokemon.name;

        // // Add click event to show details in modal
        listItem.addEventListener("click", () => {
            pokemonRepository.showDetails(pokemon);
            $("#exampleModal").modal("show");
        });

        $(".list-group").append(listItem);
    });
});