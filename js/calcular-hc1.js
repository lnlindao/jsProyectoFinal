let listaAlimentos = [];
const listarAlimentos = document.getElementById("listaAlimentos");
let btnQuitarAlimento,  
    idAlimento = 0; ;
let btnAgregarAlimento = $(".agregarAlimento").get();
for( let alimentos of btnAgregarAlimento){
    alimentos.addEventListener("click" , agregarAlimentoLista )
}
console.log(btnAgregarAlimento)


class Alimento{
    constructor(id, nombre, porcion, cantidadHC){
        this.id = id;
        this.nombre = nombre;
        this.porcion = porcion;
        this.cantidadHC = cantidadHC;
    }

}

cargarEventos();
function cargarEventos(){
    //Al cargar documento se muestra lo almacenado en LS
    document.addEventListener('DOMContentLoaded', leerLocalStorage());
    
    //Cuando se elimina alimentos del carrito
    listarAlimentos.addEventListener('click', (e)=>{quitarAlimento(e)});
 
}



/** 
 * SELECCIONAR TODAS LAS CARDS DE ALIMENTOS 
 * */


function agregarAlimentoLista(e){    
    idAlimento+=1;
    let hijo = e.target;
    let padre = hijo.parentNode.parentNode;
    

    let nombrealimento = padre.querySelector("h5").textContent;
    let img = padre.querySelector("img").src;
    let peso = padre.querySelector('.pesoGr').textContent;
    let totalHC = padre.querySelector(".hcTotales").textContent;

    const alimento = {
        id: idAlimento,
        nombre: nombrealimento,
        img: img,
        peso: peso,
        totalHC: totalHC,
        cantidad: 1
    }

    listaAlimentos.push(alimento);
    mostrarAlimentosDOM(alimento);
}



function mostrarAlimentosDOM(alimento){
    let fila = document.createElement("div"); 
    fila.className= "row py-3";

    fila.innerHTML = `<div class="col-md-2"><img src="${alimento.img} "></div>
                    <div class="col-md-3">${alimento.nombre}</div>
                    <div class="col-md-5">Peso porción: ${alimento.peso} <br> Gramos HC: ${alimento.totalHC}</div>
                    <div class="col-md-2"><button class="btn btn-danger quitarAlimento" data-id="${alimento.id}">x</button></div>`
    
    listarAlimentos.appendChild( fila );

    guardarAlimentosLocalStorage(alimento);
}


/** 
 * ELIMINAR ALIMENTOS DE LA LISTA 
 * */
function quitarAlimento(e) {  
    e.preventDefault();
    let alimento, alimentoID;
    if(e.target.classList.contains('quitarAlimento')){
        e.target.parentElement.parentElement.remove();
        alimento = e.target.parentElement.parentElement;
        alimentoID = alimento.querySelector("button").getAttribute('data-id');
        console.log(alimentoID)        
    }    
    eliminarAlimentoLocalStorage(alimentoID);
    
}




/** 
 * LOCAL STORAGE 
 * */

//Almacenar en el LS
function guardarAlimentosLocalStorage(alimento){
    let alimentos;
    //Toma valor de un arreglo con datos del LS
    alimentos = obtenerAlimentosLocalStorage();
    //Agregar el alimento al carrito
    alimentos.push(alimento);
    // JSON almacenar alimentos agregados
    localStorage.setItem("Lista alimentos agregados" , JSON.stringify( alimentos ));

}

//Comprobar que hay elementos en el LS
function obtenerAlimentosLocalStorage(){
    let alimentoLS;
    //Comprobar si hay algo en LS
    if(localStorage.getItem('Lista alimentos agregados') === null){
        alimentoLS = [];
    }
    else {
        alimentoLS = JSON.parse(localStorage.getItem('Lista alimentos agregados'));
    }
    return alimentoLS;
}

//Mostrar los alimentos guardados en el LS
function leerLocalStorage(){
    let alimentoLS;
    alimentoLS = obtenerAlimentosLocalStorage();
    alimentoLS.forEach(function (alimento){
        //Construir plantilla
        let fila = document.createElement("div"); 
        fila.className= "row py-3";
        fila.innerHTML = `<div class="col-md-2"><img src="${alimento.img} "></div>
                        <div class="col-md-2">${alimento.nombre}</div>
                        <div class="col-md-4">Peso porción: ${alimento.peso} <br> Gramos HC: ${alimento.totalHC}</div>
                        <div class="col-md-2"><input type="number" class="form-control cantidad" min="1" value=${alimento.cantidad}></div>
                        <div class="col-md-2"><button class="btn btn-danger quitarAlimento" data-id="${alimento.id}">x</button></div>`
        listarAlimentos.appendChild( fila );
    });
}

//Eliminar alimento por ID del LS
function eliminarAlimentoLocalStorage(alimentoID){
    //Obtenemos el arreglo de alimentos
    let alimentosLS = obtenerAlimentosLocalStorage();
    //Comparar el id del alimento borrado con LS
    alimentosLS.forEach(function(alimentoLS, index){
        if(alimentoLS.id == alimentoID){
            alimentosLS.splice(index, 1);             
        }
    });
    //Añadimos el arreglo actual al LS
    localStorage.setItem('Lista alimentos agregados', JSON.stringify(alimentosLS));
}

//Eliminar todos los datos del LS
function vaciarLocalStorage(){
    localStorage.clear();
}


//Calcular montos
function calcularTotal(){
    let productosLS;
    let total = 0;
    productosLS = this.obtenerProductosLocalStorage();
    for(let i = 0; i < productosLS.length; i++){
        let cantidadHC = Number(productosLS[i].totalHC * productosLS[i].cantidad);
        total = total + cantidadHC;
        
    }
    
    igv = parseFloat(total * 0.18).toFixed(2);
    subtotal = parseFloat(total-igv).toFixed(2);

    document.getElementById('subtotal').innerHTML = "S/. " + subtotal;
    document.getElementById('igv').innerHTML = "S/. " + igv;
    document.getElementById('total').value = "S/. " + total.toFixed(2);
}