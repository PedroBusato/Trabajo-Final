window.addEventListener("load", function(){               
    const proxy = `https://cors-anywhere.herokuapp.com/`;

    let idArtista = location.search;
    let idArtistaObj = new  URLSearchParams(idArtista);
    let idParaFetch = idArtistaObj.get("idDJ");

    fetch(`${proxy}https://api.deezer.com/artist/${idParaFetch}`)

    .then(function(response){
        return response.json()
    })

    .then(function(datos){           
        console.log(datos)
        document.querySelector(".djarticle").innerHTML += `
        <h2 class="djname">${datos.name}</h2>
        <img src="${datos.picture_medium}" class="artistasimg">
        <div class="seguirdj">
            <i id="icono" class="fas fa-plus-circle"></i>
            <p class="seguir">Seguir</p>
        </div>
        <p class="toptracks">Top Tracks</p>
        `;
        fetch (`${proxy}https://api.deezer.com/artist/${idParaFetch}/top`)    //Fetch para agarrar el top 5 canciones del artista!                          //Ahora vamos a buscar las top 5 canciones de nuestro artista

        .then(function(response2){
            return response2.json()
        })

        .then(function(datos2){
            console.log(datos2)
            console.log(datos2.data)
            for (let x = 0; x<datos2.data.length; x+=1){
                let cancion = datos2.data[x].title;
                document.querySelector(".listaCancionesDj").innerHTML += `<li>${cancion}</li>`
            }
        })

        .catch(function(error){
            console.log("El error es: " + error)
        })
    })

    .catch(function(error){
        console.log("El error fue: " + error)
    })



    
})
