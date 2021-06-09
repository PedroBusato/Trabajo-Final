window.addEventListener("load", function(){               
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    const apiREG = `${proxy}https://api.deezer.com/genre/122/artists`;             //API para artistas de reggaeton!

    // ---- Fetch para encontrar top reggaetoneros ---- //
    fetch(apiREG)                                                                  
        .then (function(response){
            return (response.json());
        })

        .then (function(datos){
            console.log(datos)
            let imagenesLatin = document.querySelectorAll(".latinImg");                                 //Selecciono todos los elementos con dicha clase --> me devuelve un array
            let infoLatin = document.querySelectorAll(".latinInfo");                                    //El scope de estas variables es unicamente dentro del .then donde se encuentran

            for (let x = 0; x<imagenesLatin.length; x+=1){
                imagenesLatin[x].innerHTML = `<img src="${datos.data[x].picture_medium}">`   
            }

            let idArtista = []                                                                          //Creo un array donde guardo los ID de los artistas

            for (let y = 0; y<infoLatin.length; y+=1){
                idArtista.push(datos.data[y].id)
                infoLatin[y].innerHTML += `
                <h2>Artist: ${datos.data[y].name}</h2>`                                                 //Hasta el momento encontramos la foto del artista y su nombre. Necesitamos el album y la duracion de la cancion!!!
            }

            for(let p = 0; p<idArtista.length; p+=1){          
                fetch(`${proxy}https://api.deezer.com/artist/${idArtista[p]}/top`)                      //El ciclo "for" permite hacer un fetch para cada artista, a partir de su ID
                    .then(function(response2){
                        return response2.json();
                    })
                            
                    .then(function(datos2){                                                             //datos2 es un objeto con un array dentro con las top 5 canciones del artista
                        infoLatin[p].innerHTML += `
                        <a href="detail-track.html?idCancion=${datos2.data[0].id}"> <h3>Song: ${datos2.data[0].title}</h3> </a> 
                        <p>Album: ${datos2.data[0].album.title}</p>
                        <p>Duration: ${datos2.data[0].duration}s</p>
                        `
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
                // console.log("DJs")
                // console.log(datos)
                let sectionsDj = document.querySelectorAll(".sectiondj");
                // console.log(sectionsDj)
                for (let j = 0; j<sectionsDj.length; j+=1){
                    sectionsDj[j].innerHTML += `
                    <a href="detail-artist.html?idDJ=${datos.data[j].id}"> <img src="${datos.data[j].picture_medium}"> </a> 
                    <h2 class="djname">${datos.data[j].name}</h2>
                    `
                }                                                                                       //En la lines 66 agregamos el queryString con el ID del Dj para que el detail-track.js puede tomarlo para mostrar la info del DJ
            })
    
            .catch (function(error){
                console.log("El error es: " + error)
            })      
        

        // ---- Fetch para encontrar top albums ---- //
        const apiAlbumes = `${proxy}https://api.deezer.com/genre/0/artists`;
        fetch(apiAlbumes)
        .then(function(response){
            return response.json()
        })

        .then(function(datos){
            // console.log("Artistas del genero All")
            // console.log(datos)
            let seccionAlbum = document.querySelectorAll(".albumborder");

            let idArtista =[]
            
            for(let i = 0; i<seccionAlbum.length; i+=1){
                idArtista.push(datos.data[i].id)
            }
            
            for(let x = 0; x<idArtista.length; x+=1){ 
                fetch(`${proxy}https://api.deezer.com/artist/${idArtista[x]}/albums`)
                    .then (function(response2){
                        return response2.json()
                    })

                    .then (function(datos2){
                        // console.log("Los albumes de los artistas son:")
                        // console.log(datos2)
                        seccionAlbum[x].innerHTML +=`
                        <img src="${datos2.data[0].cover_medium}">
                        <h2 class="albumtext">${datos2.data[0].title} </h2>
                        `;                                                                              //Usamos siempre data[0] para agarrar la informacion del album top!
                    })

                    .catch(function(error){
                        console.log("El error es: " + error)
                    })
            }
        })

        .catch(function(error){
            console.log("El error es: " + error)
        })

        
        // const myForm = document.querySelector("#myform")
        // const inputBuscador = document.querySelector(".CuadrodeBusqueda")
        // const msgError = document.querySelector(".msgerror")
        // console.log(inputBuscador.value)

        // if (inputBuscador.value == ""){
        //     myForm.addEventListener("submit",function(e){
        //         e.preventDefault();
        //     })
        //     msgError.innerHTML = "Por favor, introduzca texto"
        // } else if((inputBuscador.value).length < 3){
        //     myForm.addEventListener("submit",function(e2){
        //         e2.preventDefault();
        //     })
        // } else {
        //     myForm.addEventListener("submit")
        // }
        

        
        
        // // myform.addEventListener("submit", OnSubmit)

        // // function OnSubmit (e) {
        // //     e.preventDefault();
            
        // //     if(inputbuscador.value === "") {
        // //         msgerror.innerHTML = "Por favor, introduzca texto";
        // //     } else {
        // //         window.location.href = "search-results.html"
        // //     }
        // // }
})


