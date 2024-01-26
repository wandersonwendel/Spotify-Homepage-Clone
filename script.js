/* Declarando as variáveis */
const searchInput = document.getElementById("search-input");
const resultsArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists")

function requestApi(searchTerm){
    /* Consumindo a API */
    /* Passando uma url da api que contém todas as informações dos artistas filtrando (?name_like=..) pela var searchTerm, buscando os artistas cujos nomes se assemelham ao termo de pesquisa fornecido. */
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    fetch(url)
        /* Utliza then para lidar com essa operação de busca nessa url, com essa promisse retornada em feth*/
        .then((response) => response.json()) /* Recebe a resposta da solicitação da url, em seu argumento response e converte para objeto json*/
        .then((result) => displayResults(result)) /* Recebe essa resposta transformada em json, em seu argumento result */
}

function displayResults(result){
    resultPlaylist.classList.add('hidden');
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => { /* Pegando cada elemento, onde cada um será um item do result*/
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultsArtist.classList.remove('hidden');
}




/* Manipulação de eventos

"Ouvindo", se algo ocorrer no input, faça o que tiver na função */
document.addEventListener("input", function() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === ''){ /* Quando nada for digitado */
        resultPlaylist.classList.remove("hidden"); /* Remove classe hidden, já tem estilo de display none, para esconder o componente com ID result-playlists da variável resultPlylist */
        resultsArtist.classList.add("hidden"); /* Adiciona a classe hidden que já tem de primeira no componente de ID result-artist da variável resultArtists */
        return; /* Só para parar a execução pq não precisa que nada aconteça se n tem nada digitado*/
    }

    requestApi(searchTerm);
});