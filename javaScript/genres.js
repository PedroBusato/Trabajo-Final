// window.addEventListener("load", function(){               
//     const proxy = `https://cors-anywhere.herokuapp.com/`;
//     const apiGenre = `${proxy}https://api.deezer.com/genre/`;             //API para foto de Generos
  
//     fetch(apiGenre)                                                                                    //Con fetch tomamos la informacion de la API, en este caso, de los DJs
//         .then (function(response){
//             return (response.json());
//         })
    
//         .then (function(datos){
//             console.log(datos)
//             let generos = document.querySelector(".generos");
//             for (let x = 0; x<datos.data.length; x+=1){
//                 generos.innerHTML += `
//                 <div class="gen">
//                     <a href="detail-genre.html?idGenero=${datos.data[x+1].id}"> ${datos.data[x].name} </a>
//                 </div>
//                 `;
//             }
//         })
    
//         .catch (function(error){
//             console.log("El error es: " + error)
//         })
// })


window.addEventListener("load", function(){               
    const proxy = `https://cors-anywhere.herokuapp.com/`;

    fetch (`${proxy}https://api.deezer.com/genre`)
    .then(function(response){
        return response.json()
    })

    .then(function(datos){
        console.log(datos)
        let recientes = document.querySelectorAll(".gen");
        for (let x = 1; x<recientes.length+1; x+=1){                                                      //Comenzamos el ciclo en 1 ya que el primer genero es "All" y no posee imagen
            recientes[x-1].innerHTML += `
            <a href="detail-genre.html?idGenero=${datos.data[x].id}"> <img src="${datos.data[x].picture_medium}"> </a>
            <h2>${datos.data[x].name}</h2>
            `;
        }
        console.log(recientes)
        for (let i = 0; i<recientes.length; i+=1){
            recientes[i].addEventListener("mouseover",function(){
                recientes[i].classList.add("seleccionado")
            })
            recientes[i].addEventListener("mouseout",function(){
                recientes[i].classList.remove("seleccionado")
            })
            
        }
    })

    .catch(function(e){
        console.log("El error es: " + e)
    })
})
