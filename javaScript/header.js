window.addEventListener("load", function(){                 //Permite que cargue primero el HTML y luego el javaScript --> Permite evitar errores!
    const proxy = `https://cors-anywhere.herokuapp.com/`;     //Como la api es semipublica este proxy sirve como clave de acceso para pedir un request de acceso temporal

        // ---- JavaScript para el formulario ---- //
    const myform = document.querySelector("#myform");          // Selecciono con el DOM formulario del HTML home
    const inputbuscador = document.querySelector(".CuadrodeBusqueda"); //input del HTML
    const msgerror = document.querySelector(".msgerror"); //etiqueta div vacia
    let encontroGenero = false;    // buleano que utilizaremos luego en las lineas 28 y 32 si se ejecuta (o no) de la busqueda                                              

    myform.addEventListener("submit", OnSubmit); //funcion submit del "enter" envia datos al servidor

    function OnSubmit (e) { 
        e.preventDefault(); //Le quito la propiedad por defecto de enviar datos al servidor porque lo usaremos de otro modo
            
        if(inputbuscador.value === "" || inputbuscador.value.length <= 2) {   
            msgerror.innerText = "Por favor, introduzca más de 2 caracteres";                                         //Habiamos puesto innerHTML pero creo que deberia ser innerText porque ya existe el div en el HTML y estamos modificando su contenido
        } else {
            fetch(`${proxy}https://api.deezer.com/genre`)
            .then(function(response){
                return response.json();
            })

            .then(function(datos){
            console.log(datos);
                for (let i = 1; i<(datos.data).length; i+=1){     // Arrancamos el for desde 1 para no agarrar el genero "all" que no tiene imagen en la API
                    if((datos.data[i].name).toUpperCase()  ===  (inputbuscador.value).toUpperCase()) {
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
