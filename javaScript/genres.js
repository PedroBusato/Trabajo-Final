window.addEventListener("load", function(){               
    let idGenre = location.search;
    let idGenreObj = new URLSearchParams(idGenre);
    let idGen = idGenreObj.get("idCancion")
    
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    
    console.log(idGen)

    fetch (`${proxy}https://api.deezer.com/genre/${idGen}`)
    .then(function(response){
        return response.json()
    })

    .then(function(datos){
        console.log(datos)
        let insertarFoto = document.querySelector(".gen");
        insertarFoto.innerHTML = `
        <img class="disco1" src="${datos..cover}">
        <h2>${}</h2>`
        
        let insertarInfo = document.querySelector(".infoJavaScript");
        insertarInfo.innerHTML += `
        <p>${datos.title}</p>
        <p>${datos.artist.name}</p>
        <p>${datos.album.title}</p>
        `;
    })

    .catch(function(e){
        console.log("El error es: " + e)
    })

    // ---- JavaScript para el formulario ---- //
    const myform = document.querySelector(`#myform`)
    const inputbuscador = document.querySelector(`.CuadrodeBusqueda`)
    const msgerror = document.querySelector(`.msgerror`)

    myform.addEventListener(`submit`, OnSubmit)

    function OnSubmit (e) {
        e.preventDefault();
            
        if(inputbuscador.value === '' || inputbuscador.value.length <= 2) {
            msgerror.innerHTML = 'Por favor, introduzca texto';
        } else {
            window.location.href = "search-results.html"
        }
    }


})