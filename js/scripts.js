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

    function getAll () {
        return pokemonList;
    }
    function add (pokemon) {
        return pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add
    }

})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'any'});

pokemonRepository.getAll().forEach( item => {
    if (item.height > 3) {
        document.write (item.name + '(height:' + item.height + 'ABSOLUTE UNIT!!' + ')' + '<br>');
    }
    else {
        document.write (item.name + '(height:' + item.height + ')' + '<br>');
    }

    console.log(item);
});