window.addEventListener("load", function(){               
    const proxy = `https://cors-anywhere.herokuapp.com/`;
  
    let queryString = location.search;
    let queryStringObj = new URLSearchParams(queryString);
    let idGenero = queryStringObj.get("idGenero");  //Aca estamos conectando con el queryString de Generos
  
    fetch (`${proxy}https://api.deezer.com/genre/${idGenero}`)                                            //El primer fetch permite tomar unicamente el nombre e imagen del genero
      .then(function(response){
          return response.json();
      })

      .then(function(datos){
        console.log(datos);
        let tituloGenero = document.querySelector(".tit1")
        tituloGenero.innerText = `${datos.name}`
  
        let infoGenero = document.querySelector(".artdetailgen");
        infoGenero.innerHTML +=`
        <img class="imgdetailgenre" src="${datos.picture_big}">
        <p class="datosdetgen">Listen now to the most iconic Artists of this genre🔥🔥🔥!</p> 
        `; //Este es un texto decorativo similar a los de las Playlist de Spotify que aparecera en todos los generos, cualquiera que se seleccione

      })
      .catch(function(error){
        console.log("el error fue: "+ error)
      })
  
    fetch (`${proxy}https://api.deezer.com/genre/${idGenero}/artists`)                                  //Este segundo fetch es necesario para tomar las primeras 3 bandas/artistas del genero
    .then(function(response1){
        return response1.json();
    })

    .then(function(datos1){
      console.log(datos1)
      let topBandas = document.querySelector(".bandasGenero");
      for (let x = 0; x<3; x+=1){
        topBandas.innerHTML += `
        <li> <a href="detail-artist.html?idArtista=${datos1.data[x].id}"> <img class="imgbands" src="${datos1.data[x].picture_big}"> ${datos1.data[x].name} </a> </li>      
        `;
      }
    })
    
    .catch(function(error1){
      console.log("el error fue: "+ error1)
    })
})
