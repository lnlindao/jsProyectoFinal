
/** SELECCIONAR TODAS LAS CARDS DE ALIMENTOS */

let listaAlimentos = [];
let btnAgregarAlimento = $(".agregarAlimento").get();
for( let alimentos of btnAgregarAlimento){
    alimentos.addEventListener("click" , agregarAlimentoLista )
}
console.log(btnAgregarAlimento)

function agregarAlimentoLista(e){
    let hijo = e.target;
    let padre = hijo.parentNode.parentNode;

    let nombreProducto = padre.querySelector("h5").textContent;
    let img = padre.querySelector("img").src;
    let peso = padre.querySelector("p").textContent;

    const alimento = {
        nombre: nombreProducto,
        img: img,
        peso: peso
    }

    listaAlimentos.push(alimento);
    mostrarAlimentos(alimento);
}



function mostrarAlimentos(alimento){
    let fila = document.createElement("div"); 
    fila.className= "row";

    fila.innerHTML = `<div class="col-md-2"><img src="${alimento.img} "></div>
                    <div class="col-md-3">${alimento.nombre}</div>
                    <div class="col-md-5">${alimento.peso}</div>
                    <div class="col-md-2"><button class="btn btn-danger quitarAlimento" onclick="quitarAlimento()" >x</button></div>`
    
    // JSON almacenar alimentos agregados
    localStorage.setItem("Lista alimentos agregados" , JSON.stringify( listaAlimentos ));

    let listarAlimentos = document.getElementById("listaAlimentos");
    listarAlimentos.appendChild( fila );
}


// ELIMINAR ALIMENTOS
let btnQuitarAlimento = $(".quitarAlimento").get();
for( let quitarAlimento of btnQuitarAlimento){
    quitarAlimento.addEventListener("click" , quitarAlimento )
}
console.log(btnQuitarAlimento)
function quitarAlimento(e) {
    
    console.log("btnQuitarAlimento")
    e.preventDefault();
    let alimentoSeleccionado, alimentoID;
    if(e.target.classList.contains('quitarAlimento')){
        e.target.parentElement.parentElement.remove();
        alimentoSeleccionado = e.target.parentElement.parentElement;
        alimentoID = alimentoSeleccionado.querySelector('a').getAttribute('data-id');
    }
    
    const alimento = {
        nombre: nombreProducto,
        img: img,
        peso: peso
    }

    mostrarAlimentos(alimento);
}

