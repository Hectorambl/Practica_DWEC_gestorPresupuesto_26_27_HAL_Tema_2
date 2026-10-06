'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto  = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(value) {
    if(typeof value === 'number' && value >= 0){
        presupuesto = value;
        console.log(presupuesto);
        return presupuesto
    }else{
        console.log(`Error al intriducir el valor: "${value}" `)
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion,valor,fecha,...etiquetas) {

    if(typeof valor !== "number" || valor < 0){
        valor = 0;
    }

    if(typeof fecha === 'string'  && !isNaN(Date.parse(fecha))){
        fecha = Date.parse(fecha); 
    }else{
        fecha = Date.now();
    }

    this.descripcion = descripcion;
    this.valor = valor;
    this.fecha = fecha;
    this.etiquetas = etiquetas;


    this.mostrarGastoCompleto = function() {
        console.log("entro en mostrarGastoCompleto");
        let etiquetas = "";

        for (let etiqueta of this.etiquetas) {
            etiquetas += `- ${etiqueta}\n`;
        }

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n` +
            `Fecha: ${new Date(this.fecha).toLocaleString()}\n` +
            `Etiquetas:\n` +
            etiquetas;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion
    };

    this.actualizarValor = function(nuevoValor) {
        if(nuevoValor < 0 || typeof nuevoValor !== "number"){
            nuevoValor = this.valor;
        }

        this.valor = nuevoValor;
    };

    this.anyadirEtiquetas = function(...nuevasEtiquetas){
        for(let etiqueta of nuevasEtiquetas){
            if(!this.etiquetas.includes(etiqueta)){
                this.etiquetas.push(etiqueta);
            }
        }
    };
}


function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(gastoId){

    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id == gastoId) {
            gastos.splice(i,1);
        }
    }
}

function calcularTotalGastos(){

    let result = 0;

    for(let gasto of gastos){
        result += gasto.valor;
    }

    return result;
}

function calcularBalance(){

    return presupuesto - calcularTotalGastos();

}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
