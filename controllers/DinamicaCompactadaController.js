
const stack =65536;
const heap =131072;
let tamanoProceso=0;
let nombreProceso="";
let proceso;
let particionesD = [];



const procesos = [
  {
    titulo: "Proceso 1",
    text: "19524",
    data: "12352",
    bss: "1165", 
  },
  {
    titulo: "Proceso 2",
    text: "26981",
    data: "19524",
    bss: "100", 
  },
  {
    titulo: "Proceso 3",
    text: "26981",
    data: "19524",
    bss: "100", 
  },
  {
    titulo: "Proceso 4",
    text: "26981",
    data: "19524",
    bss: "100", 
  },
  {
    titulo: "Proceso 5",
    text: "349000",
    data: "2150000",
    bss: "1000", 
  },

];


const tamanoMemoria = 16 * 1024 * 1024; 
const tamanoSO = 1 * 1024 * 1024; 

function crearArregloMemoriaD() {
  particionesD = [];
  particionesD.push({
    tipo: "SO",
    tamano: tamanoSO,
    inicio: 0,
    fin: tamanoSO - 1,
  });

  return particionesD;
}


function obtenerTamanoProceso(nombreProceso){
  const procesoEncontrado = procesos.find(function(proceso) {
  return proceso.titulo === nombreProceso;
});
   if(procesoEncontrado){
     tamanoProceso = parseInt(procesoEncontrado.bss)+parseInt(procesoEncontrado.data)+parseInt(procesoEncontrado.text)+stack+heap;
     return tamanoProceso
   }else{
    console.log("Proceso no encontrado");
   }
}
 

const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');

function agregarProcesoD(nombreProceso, particionesD) {
    const tamano = obtenerTamanoProceso(nombreProceso); // Obtener el tamaño del proceso
    if (tamano > 0) { // Verificar que el tamaño sea mayor que 0
      // Verificar si ya existe un proceso con el mismo nombre
      if (particionesD.some(particion => particion.tipo === nombreProceso)) {
        console.log("Ya existe un proceso con el nombre " + nombreProceso);
        return particionesD;
      }
  
      let inicioProceso, finProceso;
      if (particionesD.length === 0) { // Si no hay particiones, iniciar en 0
        inicioProceso = 0;
      } else {
        // Obtener el fin de la última partición asignada que no sea de tipo 'Disponible'
        const ultimaParticionAsignada = particionesD.reduceRight((prev, curr) => prev ? prev : (curr.tipo !== 'Disponible' ? curr : null), null);
        if (!ultimaParticionAsignada) {
          console.log("No se pudo encontrar la última partición asignada.");
          return particionesD;
        }
        inicioProceso = ultimaParticionAsignada.fin + 1;
      }
      finProceso = inicioProceso + tamano - 1;
  
      // Verificar si el proceso excede el límite de memoria
      if (finProceso > tamanoMemoria - 1) {
        console.log("El proceso excede el límite de memoria.");
        return particionesD;
      }
      
      particionesD.push({
        tipo: nombreProceso,
        tamano: tamano,
        inicio: inicioProceso,
        fin: finProceso,
      });
  
      console.log("Proceso " + nombreProceso + " agregado con éxito, tamaño: " + tamano);
      localStorage.setItem('particiones', JSON.stringify(particionesD));
    } else {
      console.log("No se pudo obtener el tamaño del proceso " + nombreProceso);
    }
    return particionesD;
  }

function agregarNuevoProcesoD(titulo, text, data, bss) {
  const nuevoProceso = {
    titulo: titulo,
    text: text,
    data: data,
    bss: bss,
  };
  procesos.push(nuevoProceso);
  agregarProcesoD(nuevoProceso.titulo, particionesD)
  console.log(nuevoProceso.titulo);

  return particionesD;
}

function borrarProcesoD(nombreProceso, particionesD) {
    const indice = particionesD.findIndex(particion => particion.tipo === nombreProceso);
    if (indice !== -1) {
      particionesD.splice(indice, 1);
      console.log("Proceso " + nombreProceso + " eliminado con éxito");
      localStorage.setItem('particiones', JSON.stringify(particionesD));
  
      // Recalcular inicio y fin de particiones
      let inicioProceso = 0;
      particionesD.forEach(particion => {
        particion.inicio = inicioProceso;
        particion.fin = inicioProceso + particion.tamano - 1;
        inicioProceso = particion.fin + 1;
      });
    } else {
      console.log("Proceso " + nombreProceso + " no encontrado");
    }
    return particionesD;
  }
  

module.exports = {
  agregarProcesoD,
  crearArregloMemoriaD,
  agregarNuevoProcesoD,
  borrarProcesoD,
};
