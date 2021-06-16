window.addEventListener("load", function(){               
    const proxy = `https://cors-anywhere.herokuapp.com/`;

    let idArtista = location.search;
    let idArtistaObj = new  URLSearchParams(idArtista);
    let idParaFetch = idArtistaObj.get("idArtista");
    fetch(`${proxy}https://api.deezer.com/artist/${idParaFetch}`)                                       //No podemos hacer directamente "artist/${idParaFetch}/top" ya que esta segunda API no nos otorga la foto del artista

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
    })

    .catch(function(error){
        console.log("El error fue: " + error)
    })

    fetch (`${proxy}https://api.deezer.com/artist/${idParaFetch}/top`)                                  //Con este fetch encontramos los 5 top canciones del artista

        .then(function(response2){
            return response2.json()
        })

        .then(function(datos2){
            console.log(datos2)
            for (let x = 0; x<datos2.data.length; x+=1){
                let cancion = datos2.data[x].title;
                document.querySelector(".listaCancionesDj").innerHTML += `<a href="detail-track.html?idCancion=${datos2.data[x].id}"> <li>${cancion}</li> </a>`
            }
        })

        .catch(function(error){
            console.log("El error es: " + error)
        })

    fetch(`${proxy}https://api.deezer.com/artist/${idParaFetch}/albums`)                            //No podemos hacer directamente "artist/${idParaFetch}/top" ya que esta segunda API no nos otorga la foto del artista

    .then(function(response3){
        return response3.json()
    })

    .then(function(datos3){    
        console.log("Albumes del artista")                                                                     //Hacemos un tercer fetch para encontrar los Top 3 albumes de nuestro artista
        console.log(datos3)    

        let primeraVez = true;
        
        let boton = document.querySelector(".vermas");
        boton.addEventListener("click",function(){
            if (primeraVez === true){
                for (let x = 0; x<3; x+=1){                                                         //¿Por que x<3? --> Queremos mostrar solo los primeros tres albumes
                    document.querySelector(".albumesDj").innerHTML +=`
                    <div class="cadaAlbum">
                        <a href="detail-album.html?idAlbum=${datos3.data[x].id}"> <img class="albumesAdicionales" src="${datos3.data[x].cover_medium}"> </a>
                        <h2 class="albumName">${datos3.data[x].title}</h2>
                    </div>
                    `;
                }
                primeraVez = false

            } else if(primeraVez === false){
                let esconder = document.querySelectorAll(".cadaAlbum");
                console.log(esconder)
                for (let i = 0; i<esconder.length; i+=1){
                    esconder[i].classList.add("esconderAlbumes");
                }
                primeraVez = true
            }
        })
    })

    .catch(function(error){
        console.log("El error fue: " + error)
    })
})
