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
  ]


pokemonList.forEach( (item, i, arr) => {
        document.write(pokemonList[i].name + '(height:' + pokemonList[i].height + ')')
        if (pokemonList[i].height > 3) {
            document.write('ABSOLUTE UNIT!!');
        }
        
        console.log(i, item, arr)});