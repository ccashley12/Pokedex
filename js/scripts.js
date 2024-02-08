let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector('#modal-container');

    // Function to show details of Pokémon in modals
    function showModal(title, text, img) {

        // Clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', img);
        imageElement.setAttribute('width', '300')
        imageElement.setAttribute('height', '300')
        imageElement.setAttribute('alt', 'Pokémon')

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    // Function to hide modal when visible
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    // Hide modal by pressing down Escape on keyboard
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal(); 
        }
    });

    // Hide modal when user clicks outside of modal
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    // Function to add Pokémon to the list
    function add (pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
        ) {
           pokemonList.push(pokemon); 
        } else {
            console.log('pokemon is not correct');
        }
    }

    // Function to return list of all Pokémon
    function getAll() {
        return pokemonList;
    }

    // Add list of buttons to array
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('li');
        let button = document.createElement('button')
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);

        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    // Function to fetch and load Pokémon list from API
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (pokemon) {
                let pokemonDetails = {
                    name: pokemon.name,
                    detailsUrl: pokemon.url
                };
                add(pokemonDetails);
                console.log(pokemonDetails);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    // Function to fetch and load details for specific Pokémon
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Function to show details of a Pokémon and show modal
    function showDetails(pokemon) {
          showModal(pokemon)
    }
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

// Fetch and load Pokémon list and create list items for each Pokémon
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});