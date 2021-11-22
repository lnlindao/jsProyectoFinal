//Declaramos la url que vamos a usar para el GET
const URLGET   = "assets/users.json"

//Escuchamos el evento click del botón agregado
$("#login").click(() => { 
    
    let usuario = document.getElementById("user");
    let contrasena = document.getElementById("password");

    $.get(URLGET, function (datos) {
        console.log(datos)
        let userOK = datos.find(usuarioDePaciente => usuarioDePaciente.nombre == usuario.value)
        let password = datos.find(clavePaciente => clavePaciente.clave == contrasena.value)    
        if(userOK && password){
            let posicion = datos.indexOf(userOK)
            console.log(posicion)
            $("#statusLogin").html(`<div class="alert alert-success" role="alert">
                                Bienvenido nuevamente ${datos[posicion].nombre}                                    
                             </div>`);
        }else{
            $("#statusLogin").html(`<div class="alert alert-danger" role="alert">
                                Los datos ingresados no son correctos                                    
                             </div>`);
        } 
    });
});


    
    
