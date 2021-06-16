window.addEventListener("load",function(){
    const proxy = `https://cors-anywhere.herokuapp.com/`;

    // fetch(`${proxy}https://api.deezer.com/playlist/931/tracks`)                                      Ibamos a utilizar la API de "playlists" pero tienen muy pocas canciones las playlists que encontramos, y todas de artistas muy semejantes
    fetch(`${proxy}https://api.deezer.com/genre/0/artists`)
    .then(function(response){
        return response.json()
    })

    .then(function(datos){
        console.log(datos)
        let elementosPL = document.querySelectorAll(".elemento1PL");
        
        let idArtistas = []
        
        for (let x = 0; x<elementosPL.length; x+=1){
            let artistaRandom = Math.floor(Math.random()*datos.data.length)
            idArtistas.push(datos.data[artistaRandom].id)
            
            elementosPL[x].innerHTML += `
            <img class="imgPL" src="${datos.data[artistaRandom].picture_big}">
            <div class="infoPL">
                <a href="detail-artist.html?idArtista=${datos.data[artistaRandom].id}"> <p>${datos.data[artistaRandom].name}</p> </a>
            </div>
            `;
        }

        let obtengoArray = localStorage.getItem("cancionesAgregar");
        let obtengoArrayParse = JSON.parse(obtengoArray);
        for (let y = 0; y<obtengoArrayParse.length; y+=1){
            elementosPL
        }

        for (let i = 0; i<idArtistas.length; i+=1){
            fetch (`${proxy}https://api.deezer.com/artist/${idArtistas[i]}/top`)                            //Nos vemos obligados a hacer un fetch dentro de otro fetch ya que necesitamos el ID del artista que nos otorgo el primer fetch
            .then(function(response2){
                return response2.json()
            })
            
            .then(function(datos2){
                console.log(datos2)
                let infoPL = document.querySelectorAll(".infoPL");
                infoPL[i].innerHTML += `
                <a href="detail-track.html?idCancion=${datos2.data[0].id}"> <p>${datos2.data[0].title}</p> </a>
                <p class="adicionalPL">${datos2.data[0].duration + "s"}</p>
                `;
            })

            .catch(function(error2){
                console.log(error2)
            })
        }
    })

    .catch(function(error){
        console.log("El error fue: " + error)
    })

})