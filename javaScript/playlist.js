window.addEventListener("load",function(){
    const proxy = `https://cors-anywhere.herokuapp.com/`;

    let obtengoArray = localStorage.getItem("cancionesAgregar");
    let obtengoArrayParse = JSON.parse(obtengoArray);
    let playlist = document.querySelector(".sectionPlaylist");
    console.log(obtengoArrayParse);

    for (let y = 0; y<obtengoArrayParse.length; y+=1){
        playlist.innerHTML+=`
        <div class="renglonPL">
            <div class="elemento1PL">
            </div>
            <div class="iconos">
            </div>
        </div>
        `;
    }

    let misCanciones = document.querySelectorAll(".elemento1PL");
    console.log(misCanciones)

    for (let x = 0; x<misCanciones.length; x+=1){
        fetch(`${proxy}https://api.deezer.com/track/${obtengoArrayParse[x]}`)
            .then(function(response){
                return response.json()
            })
            
            .then(function(datos){
                console.log(datos)
                misCanciones[x].innerHTML+=`
                <img class="imgPL" src="${datos.artist.picture_big}">
                    <div class="infoPL">
                        <a href="detail-artist.html?idArtista=${datos.artist.id}"> <p>${datos.artist.name}</p> </a>
                        <a href="detail-track.html?idCancion=${datos.id}"> <p>${datos.title}</p> </a>
                        <p class="adicionalPL">${datos.duration}s</p>
                        <p class="adicionalPL">${datos.release_date}</p>
                    </div>
                `;                
            })

            .catch(function(error){
                console.log("El error fue:" + error)
            })
    }
    
    let misIconos = document.querySelectorAll(".iconos");
    console.log(misIconos)

    for (let z = 0; z<misIconos.length; z+=1){
        misIconos[z].innerHTML += `
        <i id="eliminar" class="far fa-times-circle"></i>
        `;
        misIconos[z].addEventListener("click",function(){
            //Primero ocultamos visulamente la cancion del playlist.html
            let renglones = document.querySelectorAll(".renglonPL");
            renglones[z].classList.add("ocultar");

            //Luego eliminamos para siempre la cancion del localStorage
            let posicionEliminar = obtengoArrayParse.indexOf(obtengoArrayParse[z]);
            obtengoArrayParse.splice(posicionEliminar,1);
            localStorage.setItem("cancionesAgregar",JSON.stringify(obtengoArrayParse));
            
        });
    }
    console.log(obtengoArrayParse)
})