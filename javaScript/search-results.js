window.addEventListener("load", function(){               
  const proxy = `https://cors-anywhere.herokuapp.com/`;

  let queryString = location.search;
  let queryStringObj = new URLSearchParams(queryString);
  let idBusqueda = queryStringObj.get("idBuscador");  //Aca estamos conectando con el queryString de Generos

  fetch (`${proxy}https://api.deezer.com/genre/${idBusqueda}`)                                            //El primer fetch permite tomar unicamente el nombre e imagen del genero
    .then(function(response){
        return response.json();
    })

    .then(function(datos){
      console.log(datos);
      let tituloBusqueda = document.querySelector(".TitMusic")
      tituloBusqueda.innerText = `${datos.name}`

      let ImgBusqueda = document.querySelector(".ImgBusqueda")
      ImgBusqueda.innerHTML += `
      <img class="ImgBusqueda" src="${datos.picture_big}">
      `
      let infoBusqueda = document.querySelector(".pBuqueda");
      infoBusqueda.innerHTML +=`
      <a href="detail-artist.html?idArtista=${datos.data.id}"> <h2>Artist: ${datos.data[y].name}</h2> </a>
      <a href="detail-track.html?idCancion=${datos2.data.id}"> <h3>Song: ${datos2.data[0].title}</h3> </a> 
      <a href="detail-album.html?idAlbum=${datos2.data.album.id}"> <p>Album: ${datos2.data[0].album.title}</p> </a>
      <p>Duration: ${datos2.data.duration}s</p>
      `; 

    })
    .catch(function(error){
      console.log("el error fue: "+ error)
    })

  
})
