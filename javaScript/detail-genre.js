window.addEventListener("load", function(){               
  const proxy = `https://cors-anywhere.herokuapp.com/`;
  const apiGenre = `${proxy}https://api.deezer.com/genre/`;             //API para foto de Generos

  fetch (apiGenre)
    .then(function(response){
        return response.json();
    })
    .then(function(datos){
        console.log(datos);
        document.querySelector(".artdetailgen").innerHTML += `
        <img class="imgdetailgenre" src="${datos.data[1].picture_medium}" alt="rocknacional">
        <p class="datosdetgen">Listen now to the iconic flag bearers of Argentine rock</p>
        `
    })
    .catch(function(error){
      console.log("el error fue: "+ error)
    })