window.addEventListener("load", function(){                 //Permite que cargue primero el HTML y luego el javaScript --> Permite evitar errores!
    const proxy = `https://cors-anywhere.herokuapp.com/`;

        // ---- JavaScript para el formulario ---- //
    const myform = document.querySelector("#myform");
    const inputbuscador = document.querySelector(".CuadrodeBusqueda");
    const msgerror = document.querySelector(".msgerror");
    let encontroGenero = false;                                                  

    myform.addEventListener("submit", OnSubmit);

    function OnSubmit (e) {
        e.preventDefault();
            
        if(inputbuscador.value === "" || inputbuscador.value.length <= 2) {
            msgerror.innerText = "Por favor, introduzca texto";                                         //Habiamos puesto innerHTML pero creo que deberia ser innerText
        } else {
            fetch(`${proxy}https://api.deezer.com/genre`)
            .then(function(response){
                return response.json();
            })

            .then(function(datos){
            console.log(datos);
                for (let i = 1; i<(datos.data).length; i+=1){     // Arrancamos el for desde 1 para no agarrar el genero "all" que no tiene imagen en la API
                    if((datos.data[i].name).toUpperCase()  ===  (inputbuscador.value).toUpperCase()) {
                        console.log("asd")
                        window.location.href = `search-results.html?idGenero=${datos.data[i].id}`
                        encontroGenero = true;
                    }                
                }
                
                if(encontroGenero == false){
                    window.location.href = `search-results.html?idGenero=errorId`
                }
            })

            .catch(function(error){
            console.log("el error fue: "+ error)
            })
        }
    }
});
