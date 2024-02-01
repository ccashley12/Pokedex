let pokemonRepository = (function () {
    let pokemonList = [
    {
        name: 'Charmeleon',
        type: 'FIRE',
        height: 1.1,
        abilities: ['Blaze', 'Solar-power']
    },
    {
        name: 'Butterfree',
        type: 'FLYING',
        height: 1.1,
        abilities: ['Compoundeyes', 'Tinted-lens']
    },
    {
        name: 'Arbok',
        type: 'POISON',
        height: 3.5,
        abilities: ['Intimidte', 'Shed Skin', 'Unnerve']
    },
    {
        name: 'Pikachu',
        type: 'ELECTRIC',
        height: .4,
        abilities: ['Static', 'Lightingrod']
    },
    {
        name: 'Ninetales',
        type: 'FIRE',
        height: 1.1,
        abilities: ['Flash-fire', 'Drought']
    },
    {
        name: 'Rapidash',
        type: 'FIRE',
        height: 1.7,
        abilities: ['Flash-fire', 'Flame-body', 'Run-away']
    }
    ];

    function add (pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "type" in pokemon
        ) {
           pokemonList.push(pokemon); 
        } else {
            console.log("pokemon is not correct");
        }
    }
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('li');
        let button = document.createElement('button')
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        button.addEventListener('click', function showDetails(pokemon) {
            console.log(pokemon);
        })
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }
    function showDetails(pokemon) {
        console.log(pokemon);
    }
    function getAll() {
        return pokemonList;
    }
    return {
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        getAll: getAll,
    };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Flareon',type: 'FIRE', height: .9, abilities: ['Flash-fire', 'Guts']});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
   pokemonRepository.addListItem(pokemon);
});