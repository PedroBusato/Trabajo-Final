// window.addEventListener("load", function(){               
//     const proxy = `https://cors-anywhere.herokuapp.com/`;

//     fetch (`${proxy}https://api.deezer.com/genre`)
//     .then(function(response){
//         return response.json()
//     })

//     .then(function(datos){
//         console.log(datos)
//         let recientes = document.querySelectorAll(".gen");
//         for (let x = 1; x<recientes.length+1; x+=1){                                                      //Comenzamos el ciclo en 1 ya que el primer genero es "All" y no posee imagen
//             recientes[x-1].innerHTML += `
//             <a href="detail-genre.html?idGenero=${datos.data[x].id}"> <img src="${datos.data[x].picture_medium}"> </a>
//             <h2>${datos.data[x].name}</h2>
//             `;
//         }
//     })

//     .catch(function(e){
//         console.log("El error es: " + e)
//     })
// })