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
    })

    //Este fetch para top 3 artistas del genero
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
          <Img class="albumesAdicionales" src="${datos.data[k].picture_medium}" alt="">
          <h2 class="albumName">${datos.data[k].name}<h2>
        </div>
        `;
      }
    })
    .catch(function(error){
      console.log("el error fue: "+ error)
    })
})
