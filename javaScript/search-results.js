window.addEventListener("load", function(){               
  const proxy = `https://cors-anywhere.herokuapp.com/`;

  let queryString = location.search;
  let queryStringObj = new URLSearchParams(queryString);
  let idBusqueda = queryStringObj.get("idGenero");  //Aca estamos conectando con el queryString de Generos

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

    })
    .catch(function(error){
      console.log("el error fue: "+ error)
      alert("No hay resultados de Busqueda")
    })

  // ---- Segundo fetch para top 3 artistas del genero ---- //
  fetch (`${proxy}https://api.deezer.com/genre/${idBusqueda}/artists`)                                            //El primer fetch permite tomar unicamente el nombre e imagen del genero
    .then(function(response){
        return response.json();
    })

    .then(function(datos){
      console.log(datos);
      for (let k=0; k<3;k+=1){
        let section = document.querySelector(".artistResult")
        section.innerHTML+=`
        <div class="cadaArtista">
          <a href="detail-artist.html?idArtista=${datos.data[k].id}"> <img src="${datos.data[k].picture_medium}" alt=""> </a>
          <h2>${datos.data[k].name}<h2>
        </div>
        `;
      }
    })
    .catch(function(error){
      console.log("el error fue: "+ error)
    })
})
