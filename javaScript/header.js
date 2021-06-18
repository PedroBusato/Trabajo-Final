window.addEventListener("load", function(){                 //Permite que cargue primero el HTML y luego el javaScript --> Permite evitar errores!
    


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
                window.location.href = `search-results.html?info=${inputbuscador.value}`
            }
        }  
});
