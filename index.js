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
                divName.innerText = pokemonNome.toUpperCase().slice();


                fetch(`https://pokeapi.co/api/v2/pokemon/${input}/`)//verificar se os dados que quero estão aqui mesmo, ou busco outros dados
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (pokemonData) {

                        /* ------------------------- RETORNO TIPO ------------------------------ */

                        console.log(pokemonData);//subistituir pelo retorno em tela da nova div
                        typeResult.innerText = pokemonData.types[0].type.name.charAt(0).toUpperCase() + pokemonData.types[0].type.name.slice(1)
                        //retornar a imagem do pokémon

                        /* ---------------------------- RETORNO IMAGEM--------------------------------- */

                        const imageUrl = pokemonData.sprites.front_default;
                        const divImagem = document.getElementById('imagem');

                        divImagem.innerHTML = ''//limpa a div no html ante da proxima execução, quando executo o código de novo clicando, ele começa a leitura, lê tudo em cima, quando chega aqui limpa a div da imagem e retorna a nova

                        const img = document.createElement('img');
                        img.src = imageUrl//coloca o resultado da requisição como src na div imagem
                        divImagem.appendChild(img);//Esta linha pega o elemento de imagem recém-criado (img) e o anexa como um elemento filho ao elemento <div> com o ID "imagem". Isso essencialmente insere a imagem dentro da <div> em sua página da web.
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

/* ------------------------------ Select ------------------------------ */

fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const pokemons = data.results;
        const select = document.getElementById("select")


        pokemons.forEach((pokemon) => {
            const option = document.createElement("option");
            //Entender esse 6 abaixo e o split
            option.value = pokemon.url.split("/")[6]; // Extrai o ID do pokemon da URL
            option.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            select.appendChild(option);

        })
        
        select.addEventListener("change", function () {
            const pokemonId = select.value;
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
                .then(response => {
                    if (response.ok) {
                        return response.json(); // Analise apenas se a resposta for bem-sucedida
                    } else {
                        console.error(`Erro: Pokémon com ID ${pokemonId} não encontrado.`);
                        // Trate o erro (por exemplo, exiba uma mensagem ao usuário)
                        return null; // Evita processamento posterior (opcional)
                    }
                })

                .then(function (pokemonData) {
                    const imageUrl = pokemonData.sprites.front_default;
                    const divImagem = document.getElementById('imagem');

                    divImagem.innerHTML = "";

                    const img = document.createElement('img');
                    img.src = imageUrl//coloca o resultado da requisição como src na div imagem
                    divImagem.appendChild(img);//Esta linha pega o elemento de imagem recém-criado (img) e o anexa como um elemento filho ao elemento <div> com o ID "imagem". Isso essencialmente insere a imagem dentro da <div> em sua página da web.
                    typeResult.innerText = pokemonData.types[0].type.name.charAt(0).toUpperCase() + pokemonData.types[0].type.name.slice(1)

                    inputNumber.value = pokemonId
                    
                    

                })
                .catch(function (error) {
                    console.error("Erro:", error);
                })
                
        })
    })
    .catch(function (error) {
        console.error("Erro:", error); // Use console.error para erros
    });

/* ----------------------------- Próximos Passos ---------------------------- */

// OK - Colocar o retorno do número digitado para aparecer na div embaixo da foto
// OK - Foto quando for retornar o número
// OK - Colocar select com os pokemons
// - Linkar select e número para um retornar o outro e ai retornar os dados na section da direita
//     ->select já estpa retornado numero, mas numero ainda não retorna o select

// - Fazer outra solicitação para captura dos poderes, tipo ou outra informação?
// - Colocar contra o que é fraco ou forte