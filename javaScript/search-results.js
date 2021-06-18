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

  
})
