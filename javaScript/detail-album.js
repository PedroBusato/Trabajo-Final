window.addEventListener("load", function(){
    const proxy = `https://cors-anywhere.herokuapp.com/`;

    let idAlbum = location.search;
    let idAlbumObj = new URLSearchParams(idAlbum);
    let idParaFetch = idAlbumObj.get("idAlbum");
    console.log(idParaFetch)

    fetch(`${proxy}https://api.deezer.com/album/${idParaFetch}`)

    .then(function(response){
        return response.json()
    })

    .then(function(datos){
        document.querySelector(".artdiscos1").innerHTML += `
        <img class="imgalbums" src="${datos.cover_medium}">
        <div class="infodisco">
            <p class="datosalbum">Album - ${datos.title}</p>
            <p class="datosalbum">Artist - ${datos.artist.name}</p>
            <p class="datosalbum">Genre - ${datos.genres.data[0].name}</p>
            <p class="datosalbum">Published - ${datos.release_date}</p>
        </div>
        `;

        document.querySelector(".albumTracks").innerHTML += `
        <li>${datos.tracks.data[0].title}</li>
        <li>${datos.tracks.data[1].title}</li>
        <li>${datos.tracks.data[2].title}</li>
        <li>${datos.tracks.data[3].title}</li>
        <li>${datos.tracks.data[4].title}</li>
        `;
        
        let primeraVez = true;

        let boton = document.querySelector(".vermas");
        boton.addEventListener("click",function(){
            if (primeraVez === true){
                for (let i = 5; i<datos.tracks.data.length; i+=1){
                    document.querySelector(".albumTracks").innerHTML += `<li class="adicionales">${datos.tracks.data[i].title}</li>`
                }
                primeraVez = false;

            } else if (primeraVez === false){
                let esconder = document.querySelectorAll(".adicionales");
                for (let x = 0; x<esconder.length; x+=1){
                    esconder[x].classList.add("esconder");
                }
                primeraVez = true
            }
            
        })
        console.log(datos)
    })
    
    .catch(function(error){
        console.log("El error es: " + error)
    })

})