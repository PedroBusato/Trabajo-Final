window.addEventListener("load", function(){               
    let queyString = location.search;
    let queryStringObj = new URLSearchParams(queyString);
    let idCancion = queryStringObj.get("idCancion");
    
    const proxy = `https://cors-anywhere.herokuapp.com/`;

    fetch (`${proxy}https://api.deezer.com/track/${idCancion}`)
    .then(function(response){
        return response.json()
    })

    .then(function(datos){
        console.log(datos)
        let insertarFoto = document.querySelector(".colFotos");
        insertarFoto.innerHTML = `
        <img src="${datos.album.cover_xl}">
        `;
        
        let insertarAudio = document.querySelector(".reproductor");
        insertarAudio.innerHTML +=`
        <audio class="reproductor" src="${datos.preview}" controls="controls" type="audio/mpeg" preload="preload"></audio>         
        `;

        let insertarInfo = document.querySelector(".infoJavaScript");
        insertarInfo.innerHTML += `
        <a href="detail-track.html?idCancion=${datos.id}"> <p>${datos.title}</p> </a>
        <a href="detail-artist.html?idArtista=${datos.artist.id}"> <p>${datos.artist.name}</p> </a>
        <a href="detail-album.html?idAlbum=${datos.album.id}"> <p>${datos.album.title}</p> </a>
        `;
                                                                   
        // let cancionesParaPlaylist = [];
        // localStorage.setItem("cancionesAgregar",JSON.stringify(cancionesParaPlaylist));              //Tenemos agregado un array al localStorage, el cual permanecera alli ya que almacena informacion sin tiempo de expiracion 
        // // localStorage.clear()

        let iconoPlayList = document.querySelector("#icono");
        iconoPlayList.addEventListener("click",function(){
            let obtengoArray = localStorage.getItem("cancionesAgregar");
            let obtengoArrayParse = JSON.parse(obtengoArray);
            obtengoArrayParse.push(datos.id);
            localStorage.setItem("cancionesAgregar",JSON.stringify(obtengoArrayParse));    
        })
        
    })

    .catch(function(e){
        console.log("El error es: " + e)
    })

})