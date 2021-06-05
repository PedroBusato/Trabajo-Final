window.addEventListener("load", function(){               
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    const apiREG = `${proxy}https://api.deezer.com/genre/122/artists`;             //API para artistas de reggeton!

    fetch(apiREG)                                                                  //Con fetch tomamos la informacion de la API
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
    
    
    const apiDJ = `${proxy}https://api.deezer.com/genre/106/artists`;
    fetch(apiDJ)                                                                  //Con fetch tomamos la informacion de la API
        .then (function(response){
            return (response.json());
        })

        .then (function(datos){
            console.log(datos)
            let sectionsDj = document.querySelectorAll(".sectiondj");
            console.log(sectionsDj)
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

