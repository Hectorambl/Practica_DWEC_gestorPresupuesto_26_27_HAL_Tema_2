import * as gp from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto){

    let elemento = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;
    divGasto.append(divDescripcion);

    let divGastoFecha = document.createElement("div");
    divGastoFecha.className = "gasto-fecha";
    divGastoFecha.textContent = gasto.fecha;
    divGasto.append(divGastoFecha);

    let divGastoValor = document.createElement("div");
    divGastoValor.className = "gasto-valor";
    divGastoValor.textContent = gasto.valor;
    divGasto.append(divGastoValor);

    let divGastoEtiquetas = document.createElement("div");
    divGastoEtiquetas.className = "gasto-etiquetas";

    for(let etiqueta of gasto.etiquetas){

        let spanGastoEtiquetas = document.createElement("span");
        spanGastoEtiquetas.className = "gasto-etiquetas-etiqueta";
        spanGastoEtiquetas.textContent = etiqueta;
        divGastoEtiquetas.append(spanGastoEtiquetas);
    }

    divGasto.append(divGastoEtiquetas);
    elemento.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo ) {

    let divAgrupacion = document.createElement("div");
    divAgrupacion.classList.add("agrupacion");

    let h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(h1);

    for (var [key, value] of Object.entries(agrup)) {
        
        let divagrup = document.createElement("div");
        divagrup.classList.add("agrupacion-dato");

        let span1 = document.createElement("span");
        span1.classList.add("agrupacion-dato-clave");
        span1.textContent = key + ":   ";

        let span2 = document.createElement("span");
        span2.classList.add("agrupacion-dato-valor");
        span2.textContent = value.toFixed(2);

        divagrup.append(span1);
        divagrup.append(span2);
        divAgrupacion.append(divagrup);
    }

    document.getElementById(idElemento).append(divAgrupacion);
}


function repintar() {

    mostrarDatoEnId('presupuesto', gp.mostrarPresupuesto());

    mostrarDatoEnId('gastos-totales', gp.calcularTotalGastos().toFixed(2));

    mostrarDatoEnId('balance-total', gp.calcularBalance().toFixed(2));

    document.getElementById('listado-gastos-completo').innerHTML = "";

    for (let gasto of gp.listarGastos()) {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    }
}

function actualizarPresupuestoWeb(){
    let title = "Introduce una cantidad de presupuesto:";

    let result = prompt(title, 1000);

    result = Number(result);

    gp.actualizarPresupuesto(result);

    repintar();
}

document.getElementById("actualizarpresupuesto").addEventListener("click",actualizarPresupuestoWeb);

function nuevoGastoWeb(){

    let descripcion = prompt("Introduce una descripcion","");

    let valor = prompt("Introduce un valor", 0);
    valor = Number(valor);

    let fecha = prompt("Introduce una fecha", "2026-11-17");

    let etiquetas = prompt("Introduce las etiquetas", "");
    etiquetas = etiquetas.split(",");

    let gasto = new gp.CrearGasto(descripcion, valor, fecha, ...etiquetas);

    gp.anyadirGasto(gasto);

    repintar();
}
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}