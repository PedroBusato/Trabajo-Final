// ---- Window.addEventListener permite que cargue primero el HTML y luego el js ---- //
window.addEventListener("load", function(){                         
    const proxy = `https://cors-anywhere.herokuapp.com/`;

    // ---- Fetch para encontrar top reggaetoneros ---- //
    const apiREG = `${proxy}https://api.deezer.com/genre/122/artists`;            
    fetch(apiREG)                                                                  
        .then (function(response){                  // Convertimos la informacion recibida a objeto js
            return (response.json());
        })

        .then (function(datos){                                                                         //Una vez en formato objeto, podemos trabajar y acceder a la informacion
            let imagenesLatin = document.querySelectorAll(".latinImg");                                 //Selecciono todos los elementos con dicha clase --> me devuelve un array de 6 elementos ya que tengo 6 artistas en la lista.
            let infoLatin = document.querySelectorAll(".latinInfo");                                    //El scope de estas variables es unicamente dentro del .then donde se encuentran
            for (let x = 0; x<imagenesLatin.length; x+=1){
                imagenesLatin[x].innerHTML = `<img src="${datos.data[x].picture_medium}">`   
            };

            let idArtista = [];                                                                          //Creo un array donde guardo los ID de los artistas. La declaramos fuera del "for" de debajo por temas de scope

            for (let y = 0; y<infoLatin.length; y+=1){
                idArtista.push(datos.data[y].id)
                infoLatin[y].innerHTML += `
                <a href="detail-artist.html?idArtista=${datos.data[y].id}"> <h2>Artist: ${datos.data[y].name}</h2> </a>
                `;                                                                                      //Al trabajar con "datos.data[y].id" en lugar de "datos.data[y].name" nos ahorramos el problema que puede surgir de trabajar con artistas que tengan mas de una palabra en su nombre --> ejemplo: Bad Bunny                                        //Hasta el momento encontramos la foto del artista y su nombre. Necesitamos el album y la duracion de la cancion!!!
            }

            for(let p = 0; p<idArtista.length; p+=1){          
                fetch(`${proxy}https://api.deezer.com/artist/${idArtista[p]}/top`)                      //Hacemos un fetch para cada artista a partir de su ID. Necesitamos dicho fetch para conseguir la informacion de las canciones del artista.
                    .then(function(response2){
                        return response2.json();
                    })
                            
                    .then(function(datos2){      
                        console.log(datos2)                                                
                        infoLatin[p].innerHTML += `
                        <a href="detail-track.html?idCancion=${datos2.data[0].id}"> <h3>Song: ${datos2.data[0].title}</h3> </a> 
                        <a href="detail-album.html?idAlbum=${datos2.data[0].album.id}"> <p>Album: ${datos2.data[0].album.title}</p> </a>
                        <p>Duration: ${datos2.data[0].duration}s</p>
                        `;
                    })                                                                                  //Incluimos un queryString con el "id" de la cancion para posteriormente, tomarlo desde detail-track.js
                            
                    .catch(function(error2){
                        console.log("El error proviene del fetch dentro del otro fetch y es: " + error2)
                    })
            } 
        })
        
        .catch (function(error){
            console.log("El error es: " + error)
        })

        // ---- Fetch para encontrar top DJs ---- //
        const apiDJ = `${proxy}https://api.deezer.com/genre/106/artists`;
        fetch(apiDJ)                                                                                    //Con fetch tomamos la informacion de la API, en este caso, de los DJs
            .then (function(response){
                return (response.json());
            })
    
            .then (function(datos){
                let sectionsDj = document.querySelectorAll(".sectiondj");                               //Devuelve un array de 6 elementos ya que nuevamente la lista de DJs en el HTML tiene 6 artistas
                for (let j = 0; j<sectionsDj.length; j+=1){
                    sectionsDj[j].innerHTML += `
                    <a href="detail-artist.html?idArtista=${datos.data[j].id}"> <img src="${datos.data[j].picture_medium}"> </a> 
                    <h2 class="djname">${datos.data[j].name}</h2>
                    `;
                }                                                                                       //En la lines 66 agregamos el queryString con el ID del Dj para que el detail-artist.js puede tomarlo para mostrar la info del DJ
            })
    
            .catch (function(error){
                console.log("El error es: " + error)
            })      
        

        // ---- Fetch para encontrar top albums ---- //
        const apiAlbumes = `${proxy}https://api.deezer.com/genre/0/artists`;                            //Del genre "all" buscamos los artistas top dentro de Deezer
        fetch(apiAlbumes)
        .then(function(response){
            return response.json()
        })

        .then(function(datos){
            console.log(datos)
            let seccionAlbum = document.querySelectorAll(".albumborder");

            let idArtista =[];                                                                           //Guardamos los IDs de los top 6 artistas para luego buscar sus albumes mas escuchados
            
            for(let i = 0; i<seccionAlbum.length; i+=1){
                idArtista.push(datos.data[i].id)
            }

            for(let x = 0; x<idArtista.length; x+=1){ 
                fetch(`${proxy}https://api.deezer.com/artist/${idArtista[x]}/albums`)                   //Hacemos un fetch para cada artista a partir de su ID para poder acceder a la informacion de sus albumes
                    .then (function(response2){
                        return response2.json()
                    })

                    .then (function(datos2){
                        seccionAlbum[x].innerHTML +=`
                        <a href="detail-album.html?idAlbum=${datos2.data[0].id}"> <img src="${datos2.data[0].cover_medium}"> </a>
                        <h2 class="albumtext">${datos2.data[0].title} </h2>
                        `;                                                                              //Usamos siempre data[0] para agarrar la informacion del album top, es decir, el mas escuchado!
                    })

                    .catch(function(error){
                        console.log("El error es: " + error)
                    })
            }
        })

        .catch(function(error){
            console.log("El error es: " + error)
        })            
})


