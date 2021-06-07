window.addEventListener("load", function(){               
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    const apiREG = `${proxy}https://api.deezer.com/genre/122/artists`;             //API para artistas de reggeton!

    fetch(apiREG)                                                                  //Con fetch tomamos la informacion de la API, en este caso de los artistas latinos/reggaeton
        .then (function(response){
            return (response.json());
        })

        .then (function(datos){
            console.log(datos)
            let imagenesLatin = document.querySelectorAll(".latinImg");   //Selecciono todos los elementos con dicha clase --> me devuelve un array
            let infoLatin = document.querySelectorAll(".latinInfo");

            for (let x = 0; x<imagenesLatin.length; x+=1){
                imagenesLatin[x].innerHTML = `<img src="${datos.data[x].picture_medium}">`   
            }

            let idArtista = []                                                                  //Creo un array donde guardo los ID de los artistas

            for (let y = 0; y<infoLatin.length; y+=1){
                idArtista.push(datos.data[y].id)
                infoLatin[y].innerHTML += `
                <p>Artist: ${datos.data[y].name}</p>`  //Hasta el momento encontramos la foto del artista y su nombre. Necesitamos el album y la duracion de la cancion!!!
            }

            console.log(idArtista);

            for(p=0; p<idArtista.length; p+=1){          
                console.log(idArtista[p])
                
                //Meter aca el segundo fetch

            } 
        })
        
        .catch (function(error){
            console.log("El error es: " + error)
        })
        let idArtista = [8945638, 15898, 6611456, 11569041, 185943, 68719442]
        for(p=0; p<idArtista.length; p+=1){          
            console.log(idArtista[p])
            fetch(`${proxy}https://api.deezer.com/artists/${idArtista[p]}`)        //El ciclo "for" permite hacer un fetch para cada artista, a partir de su ID
                    
                    .then(function(response2){
                        return response2.json();
                    })
                            
                    .then(function(datos2){
                        console.log(datos2)
                        console.log("caca")
                    })
                            
                    .catch(function(error2){
                        console.log("El error proviene del fetch dentro del otro fetch y es: " + error2)
                    })
        }

        const apiDJ = `${proxy}https://api.deezer.com/genre/106/artists`;
        fetch(apiDJ)                                                                  //Con fetch tomamos la informacion de la API, en este caso, de los DJs
            .then (function(response){
                return (response.json());
            })
    
            .then (function(datos){
                console.log(datos)
                let sectionsDj = document.querySelectorAll(".sectiondj");
                // console.log(sectionsDj)
                for (let j = 0; j<sectionsDj.length; j+=1){
                    sectionsDj[j].innerHTML += `
                    <img src="${datos.data[j].picture_medium}">
                    <h2 class="djname">${datos.data[j].name}</h2>
                    `
                }
            })
    
            .catch (function(error){
                console.log("El error es: " + error)
            })      
            
        })

        
    



    


        
//     const apiTracks = `${proxy}https://api.deezer.com/chart/122/tracks`;
//     fetch(apiTracks)                                                                  //Con fetch tomamos la informacion de la API
//             .then (function(response){
//                 return (response.json());
//             })
    
//             .then (function(datos){
//                 console.log(datos);
//             })
    
//             .catch (function(error){
//                 console.log("El error es: " + error)
//             })
// })

