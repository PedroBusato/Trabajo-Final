window.addEventListener("load", function(){                 //Permite que cargue primero el HTML y luego el javaScript --> Permite evitar errores!
    const proxy = `https://cors-anywhere.herokuapp.com/`;

        // ---- JavaScript para el formulario ---- //
    const myform = document.querySelector("#myform");
    const inputbuscador = document.querySelector(".CuadrodeBusqueda");
    const msgerror = document.querySelector(".msgerror");

    myform.addEventListener("submit", OnSubmit);

    function OnSubmit (e) {
        e.preventDefault();
            
        if(inputbuscador.value === "" || inputbuscador.value.length <= 2) {
            msgerror.innerHTML = "Por favor, introduzca texto";
        } else {
            fetch(`${proxy}https://api.deezer.com/genre`)
            .then(function(response){
                return response.json();
            })

            .then(function(datos){
            // console.log(datos);
                for (let i = 1; i<(datos.data).length; i+=1){     // Arrancamos el for desde 1 para no agarrar el genero de todos que no tiene imagen
                    if((datos.data[i].name).toUpperCase()  ===  (inputbuscador.value).toUpperCase()) {
                        console.log("asd")
                        window.location.href = `search-results.html?idGenero=${datos.data[i].id}`
                    } else {
                        alert("No hay resultados para la busqueda de: " + inputbuscador.value )
                    }                  
                }
            })

            .catch(function(error){
            console.log("el error fue: "+ error)
            })
        }
    }
});
