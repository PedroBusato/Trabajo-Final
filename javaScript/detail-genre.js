window.addEventListener("load", function(){               
  const proxy = `https://cors-anywhere.herokuapp.com/`;

  let queryString = location.search;
  let queryStringObj = new URLSearchParams(queryString);                                              //Recordemos que la informacion en el queryString viaja en forma de string y debemos transformarla a objeto para trabajarla
  let idGenero = queryStringObj.get("idGenero");  

  // ---- Hacemos el primer fetch para encontrar el nombre del genero y su imagen ---- //
  fetch (`${proxy}https://api.deezer.com/genre/${idGenero}`)                                            
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
      `; 

    })
    .catch(function(error){
      console.log("el error fue: "+ error)
    })

  // ---- El segundo fetch nos permite buscar artistas del genero. Nosotros decidimos mostrar tres de ellos ---- //
  fetch (`${proxy}https://api.deezer.com/genre/${idGenero}/artists`)                                
    .then(function(response1){
        return response1.json();
    })

    .then(function(datos1){
      console.log(datos1)
      let topBandas = document.querySelector(".bandasGenero");
      for (let x = 0; x<3; x+=1){ 
        topBandas.innerHTML += `
        <li> 
          <a href="detail-artist.html?idArtista=${datos1.data[x].id}"> <img class="imgbands" src="${datos1.data[x].picture_big}"> ${datos1.data[x].name} </a> 
        </li>      
        `;

        // ---- Hacemos un tercer fetch dentro del fetch de artistas para poder quedarnos con un album de cada artista
        fetch(`${proxy}https://api.deezer.com/artist/${datos1.data[x].id}/albums`)                                                   
    
        .then(function(response2){
          return response2.json()
        })  
        
        .then(function(datos2){
          let primeraVez = true;
          let boton = document.querySelector(".vermas");
          
          boton.addEventListener("click",function(){
            if (primeraVez === true){ 
                document.querySelector(".albumesGenero").innerHTML +=`
                <div class="cadaAlbum">
                    <a href="detail-album.html?idAlbum=${datos2.data[x].id}"> <img class="albumesAdicionales" src="${datos2.data[x].cover_medium}"> </a>
                    <h2 class="albumName">${datos2.data[x].title}</h2>
                </div>
                `;
              primeraVez = false

            } else if(primeraVez === false){
              let esconder = document.querySelectorAll(".cadaAlbum");
              for (let i = 0; i<esconder.length; i+=1){
                esconder[i].classList.add("esconderAlbumes");
              }
              primeraVez = true
            }
          })
        })

        .catch(function(error){
          console.log("El error fue: " + error)
        })
      }
    })
    
    .catch(function(error1){
      console.log("el error fue: "+ error1)
    })
})
