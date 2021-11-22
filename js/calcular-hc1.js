let listaAlimentos = [];
const listarAlimentos = document.getElementById("listaAlimentos");
let btnQuitarAlimento,  
    idAlimento = 0;     
    let cantidad= 1;

let btnAgregarAlimento = $(".agregarAlimento").get();
for( let alimentos of btnAgregarAlimento){
    alimentos.addEventListener("click" , agregarAlimentoLista )
}


class Alimento{
    constructor(id, nombre, pesoPorcion, cantidadHC, img, numPorciones){
        this.id = id;
        this.nombre = nombre;
        this.pesoPorcion = pesoPorcion;
        this.cantidadHC = cantidadHC;
        this.img = img;
        this.numPorciones = numPorciones;
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

    let alimentosLista = new Alimento(idAlimento, nombrealimento, peso, totalHC , img, cantidad);
    console.log(alimentosLista)

    listaAlimentos.push(alimentosLista);
    mostrarAlimentosDOM(alimentosLista);
}



function mostrarAlimentosDOM(alimento){
    let fila = document.createElement("div"); 
    fila.className= "row py-3";

    fila.innerHTML = `<div class="col-md-2"><img src="${alimento.img} "></div>
                    <div class="col-md-3">${alimento.nombre}</div>
                    <div class="col-md-4">Peso porción: ${alimento.pesoPorcion} <br> Gramos HC: ${alimento.cantidadHC}</div>
                    <div class="col-md-1 gx-0"><input type="number" class="form-control cantidad" min="1" value=${alimento.numPorciones}></div>
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
        <div class="col-md-3">${alimento.nombre}</div>
        <div class="col-md-4">Peso porción: ${alimento.pesoPorcion} <br> Gramos HC: ${alimento.cantidadHC}</div>
        <div class="col-md-1 gx-0"><input type="number" class="form-control cantidad" min="1" value=${alimento.numPorciones}></div>
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


//Calcular TOTAL
$(".calcularHCtotal").on("click", function(){ 
    let alimentosLS, total = 0;
    alimentosLS = obtenerAlimentosLocalStorage();
    for(let i = 0; i < alimentosLS.length; i++){
        let cantidadHC = Number(alimentosLS[i].cantidadHC * alimentosLS[i].numPorciones);
        total = total + cantidadHC;
    }
    $(".mostrarTotalHC").fadeIn(3000).html(`<h6 class="alert alert-light" role="alert">Total hidratos de carbono ${total}</h6>`);
    
})
