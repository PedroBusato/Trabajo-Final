window.addEventListener("load", function(){
    const proxy = `https://cors-anywhere.herokuapp.com/`;

    let idAlbum = location.search;
    let idAlbumObj = new URLSearchParams(idAlbum);
    let idParaFetch = idAlbumObj.get("idAlbum");
    // console.log(idParaFetch)

    fetch(`${proxy}https://api.deezer.com/album/${idParaFetch}`)

    .then(function(response){
        return response.json()
    })

    .then(function(datos){
        console.log(datos)
        document.querySelector(".artdiscos1").innerHTML += `
        <img class="imgalbums" src="${datos.cover_medium}">
        <div class="infodisco">
            <p class="datosalbum">Album - ${datos.title}</p>
            <a href="detail-artist.html?idArtista=${datos.artist.id}"> <p class="datosalbum">Artist - ${datos.artist.name}</p> </a>
            <a href="detail-genre.html?idGenero=${datos.genre_id}"> <p class="datosalbum">Genre - ${datos.genres.data[0].name}</p> </a>
            <p class="datosalbum">Published - ${datos.release_date}</p>
        </div>
        `;

        document.querySelector(".albumTracks").innerHTML += `
        <a href="detail-track.html?idCancion=${datos.tracks.data[0].id}"> <li>${datos.tracks.data[0].title}</li> </a>
        <a href="detail-track.html?idCancion=${datos.tracks.data[1].id}"> <li>${datos.tracks.data[1].title}</li> </a>
        <a href="detail-track.html?idCancion=${datos.tracks.data[2].id}"> <li>${datos.tracks.data[2].title}</li> </a>
        <a href="detail-track.html?idCancion=${datos.tracks.data[3].id}"> <li>${datos.tracks.data[3].title}</li> </a>
        <a href="detail-track.html?idCancion=${datos.tracks.data[4].id}"> <li>${datos.tracks.data[4].title}</li> </a>
        `;
        
        let boton = document.querySelector(".vermas");
        let primeraVez = true;
        boton.addEventListener("click",function(){
            if (primeraVez === true){
                for (let i = 5; i<datos.tracks.data.length; i+=1){
                    document.querySelector(".albumTracks").innerHTML += `
                    <a href="detail-track.html?idCancion=${datos.tracks.data[i].id}"> <li class="tracksAdicionales">${datos.tracks.data[i].title}</li> </a>
                    `;
                }
                primeraVez = false;

            } else if (primeraVez === false){
                let esconder = document.querySelectorAll(".tracksAdicionales");
                for (let x = 0; x<esconder.length; x+=1){
                    esconder[x].classList.add("esconderCanciones");                                              //Les agrego la clase "esconder" que en css tiene display: none;
                }
                primeraVez = true
            }
        })
    })
    
    .catch(function(error){
        console.log("El error es: " + error)
    })

    //Estaria bueno poder agregar diseños a las canciones cuando les pasas el mouse por encima

})