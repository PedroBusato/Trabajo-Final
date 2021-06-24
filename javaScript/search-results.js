window.addEventListener("load", function(){               
  const proxy = `https://cors-anywhere.herokuapp.com/`;

  let queryString = location.search;
  let queryStringObj = new URLSearchParams(queryString);
  let idBusqueda = queryStringObj.get("idGenero");  //Aca estamos conectando con el queryString de Generos
  
  if(idBusqueda != "errorId"){
    fetch (`${proxy}https://api.deezer.com/genre/${idBusqueda}`)                                            //El primer fetch permite tomar unicamente el nombre e imagen del genero
      .then(function(response){
          return response.json();
      })

      .then(function(datos){
        console.log(datos);
        let tituloBusqueda = document.querySelector(".TitMusic")
        tituloBusqueda.innerText = `${datos.name}`

        let ImgBusqueda = document.querySelector(".ImgBusqueda");
        let artistasRelacionados = document.querySelector(".temas");
        
        ImgBusqueda.innerHTML += `
        <img class="ImgBusqueda" src="${datos.picture_big}">
        `;
        artistasRelacionados.innerHTML +=`
        <h3 class="Temasrelacionado">Related Search</h3>
        `;

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
    } else{
      let mostrarGif = document.querySelector(".gifError");
      mostrarGif.innerHTML += `
      <iframe  src="https://giphy.com/embed/14uQ3cOFteDaU" width="100%" height="360" frameBorder="0" allowFullScreen></iframe>
      <a href="home.html"><h2>Return to Home</h2> </a>
      `;
    }
})
