window.addEventListener("load", function(){               
    let queyString = location.search;
    let queryStringObj = new URLSearchParams(queyString);
    let idCancion = queryStringObj.get("idCancion")
    
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    
    console.log(idCancion)

    fetch (`${proxy}https://api.deezer.com/track/${idCancion}`)
    .then(function(response){
        return response.json()
    })

    .then(function(datos){
        console.log(datos)
        let insertarFoto = document.querySelector(".colFotos");
        insertarFoto.innerHTML = `<img class="disco1" src="${datos.album.cover}">`
        
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

})