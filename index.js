fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const pokemons = data.results;


        const enviar = document.getElementById("enviar")
        const divName = document.getElementById("name")

        enviar.addEventListener("click", function () {

            const input = document.getElementById("inputNumber").value
            const pokemonIndex = parseInt(input) - 1; // Ajusta o índice do array para começar em 0
            if (pokemonIndex >= 0 && pokemonIndex < pokemons.length) {
                const pokemonNome = pokemons[pokemonIndex].name
                divName.innerText = pokemonNome;

                fetch(`https://pokeapi.co/api/v2/pokemon/${input}/`)//verificar se os dados que quero estão aqui mesmo, ou busco outros dados
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (pokemonData) {
                        console.log(pokemonData);//subistituir pelo retorno em tela da nova div
                        typeResult.innerText = pokemonData.types[0].type.name
                        //retornar a imagem do pokémon
                    })

            } else {
                divName.innerText = "Invalid Number";
            }
            console.log(data)
        });


    })
    .catch(function (error) {
        console.log("Houve um erro: " + error);
    });



/* ----------------------------- Próximos Passos ---------------------------- */

// OK - Colocar o retorno do número digitado para aparecer na div embaixo da foto
// - Descobrir como fazer aparecer a foto quando for retornar o número
// - Colocar select com os pokemons
// - Fazer outra solicitação para captura dos poderes, tipo ou outra informação?
// - Colocar contra o que é fraco ou forte