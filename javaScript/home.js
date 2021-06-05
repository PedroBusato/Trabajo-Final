window.addEventListener("load", function(){               
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    const api = `${proxy}https://api.deezer.com/genre/122/artists`;             //API para artistas de reggeton!

    fetch(api)                                                                  //Con fetch tomamos la informacion de la API
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

            for (let y = 0; y<infoLatin.length; y+=1){
                let idArtista = datos.data[y].id
                console.log(idArtista);
                infoLatin[y].innerHTML += `
                <p>Artist: ${datos.data[y].name}</p>`  //Hasta el momento encontramos la foto del artista y su nombre. Necesitamos el album y la duracion de la cancion!!!
            }
        })

        .catch (function(error){
            console.log("El error es: " + error)
        })

})
