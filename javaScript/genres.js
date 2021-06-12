window.addEventListener("load", function(){               
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    const apiGenre = `${proxy}https://api.deezer.com/genre/`;             //API para foto de Generos
  
    fetch(apiGenre)                                                                                    //Con fetch tomamos la informacion de la API, en este caso, de los DJs
        .then (function(response){
            return (response.json());
        })
    
        .then (function(datos){
                // console.log("DJs")
                // console.log(datos)
            let Gen = document.querySelectorAll(".gen");
                    // console.log(sectionsDj)
            for (let j = 1; j<Gen.length; j+=1){
                Gen[j].innerHTML += `
                <a href="detail-genre.html?idGenre=${datos.data[j].id}"> ${datos.data[j].name}</a>
                `
            }                                                                                       //En la lines 66 agregamos el queryString con el ID del Dj para que el detail-artist.js puede tomarlo para mostrar la info del DJ
        })
    
        .catch (function(error){
            console.log("El error es: " + error)
        })    

 
        // <a href="detail-artist.html?idDJ=${datos.data[j].id}"> <img src="${datos.data[j].picture_medium}"> </a> 


})