window.addEventListener("load", function(){                 //Permite que cargue primero el HTML y luego el javaScript --> Permite evitar errores!
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    const api = `${proxy}https://api.deezer.com/genre`;

    fetch(api)                                                                  //Con fetch tomamos la informacion de la API
        .then (function(response){
            return (response.json());
        })

        .then (function(datos){
            // console.log(datos)
            let queryString = (location.search);
            let queryStringObj = new URLSearchParams (queryString);
            let resultadoBusqueda = queryStringObj.get("busquedademusica");     //Buscamos el elemento dentro del queryString
            
            if(resultadoBusqueda.length == 0){ //Preguntar como hacer para que no me redireccione !!]
                alert("La busqueda esta vacia! Intente nuevamente!")

            } else if(resultadoBusqueda.length < 3){
                alert("La busqueda debe contener al menos 3 caracteres! Intente nuevamente!")
            
            } else{                                                             //Si la busqueda tiene mas de tres caracteres de longitud, se ejecuta todo el codigo
                for (let i = 0; i<(datos.data).length; i+=1){
                    let genero = datos.data[i].name;
                    let imgGenero = datos.data[i].picture_medium;
                    if (genero.toUpperCase() == resultadoBusqueda.toUpperCase()){
                        document.querySelector(".TitMusic").innerText = `${genero}`;
                        document.querySelector(".ImgBusqueda").innerHTML = `<img src="${imgGenero}">`;
                    }
                }
            }           
        })

        .catch (function(error){
            return ("El error es: " + error)
        })

        
});
