window.addEventListener("load", function(){               
  let idGenre = location.search;
  let idGenreObj = new  URLSearchParams(idGenre);
  let idParaGenre = idGenreObj.get("idGenre");
  
  
  const proxy = `https://cors-anywhere.herokuapp.com/`;
  const apiGenre = `${proxy}https://api.deezer.com/genre/${idParaGenre}`;             //API para foto de Generos

  fetch (apiGenre)
    .then(function(response){
        return response.json();
    })
    .then(function(datos){
        console.log(datos);
        document.querySelector(".artdetailgen").innerHTML += `
        <img class="imgdetailgenre" src="${datos.picture_medium}" alt="foto-del-genero">
        `;
        fetch (`${proxy}https://api.deezer.com/genre/${idParaGenre}/artists`)    //Fetch para agarrar el top 5 canciones del artista!                          //Ahora vamos a buscar las top 5 canciones de nuestro artista

        .then(function(response2){
            return response2.json()
        })

        .then(function(datos2){
            console.log(datos2)
            console.log(datos2.data)
            for (let x = 0; x<3; x+=1){
                let artista = datos2.data[x].name;
                document.querySelector(".listaArtistas").innerHTML += `<li><img class="imgbands" src='${datos2.data[x].picture_small}' alt="">${artista}</li>`
            }
        })

        .catch(function(error){
            console.log("El error es: " + error)
        })
    })
    .catch(function(error){
      console.log("el error fue: "+ error)
    })
})