
const stack =65536;
const heap =131072;
let tamanoProceso=0;
let nombreProceso="";
let proceso;
let particiones = [];



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


function crearArregloMemoria(tamanoParticionUsuario) {
  const tamanoParticionUsuarioBytes = tamanoParticionUsuario * 1024 * 1024; 

  if (tamanoParticionUsuarioBytes <= 0 || tamanoParticionUsuario>=16) {
    console.error("Tamaño de partición inválido");
    return null;
  }
  particiones = [];
  particiones.push({
    tipo: "SO",
    tamano: tamanoSO,
    inicio: 0,
    fin: tamanoSO - 1,
  });

  let inicioUsuario = tamanoSO;
  let finUsuario = inicioUsuario + tamanoParticionUsuarioBytes - 1;
  while (finUsuario < tamanoMemoria - 1) {
    particiones.push({
      tipo: "Disponible",
      tamano: tamanoParticionUsuarioBytes,
      inicio: inicioUsuario,
      fin: finUsuario,
    });
    inicioUsuario = finUsuario + 1;
    finUsuario = inicioUsuario + tamanoParticionUsuarioBytes - 1;
  }
  if (inicioUsuario < tamanoMemoria - 1) {
    const tamanoUltimaParticion = tamanoMemoria - inicioUsuario;
    particiones.push({
      tipo: "Disponible",
      tamano: tamanoUltimaParticion,
      inicio: inicioUsuario,
      fin: tamanoMemoria - 1,
    });
  }

  return particiones;
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

function agregarProceso(nombreProceso, particiones){
  const tamano = obtenerTamanoProceso(nombreProceso); // Obtener el tamaño del proceso
  if (tamano > 0) { // Verificar que el tamaño sea mayor que 0
    let asignado = false; 
    particiones.forEach(function(particion) {
      if (!asignado && particion.tipo === 'Disponible' && tamano <= parseInt(particion.tamano) && !particiones.find(p => p.tipo === nombreProceso)) {
        particion.tipo = nombreProceso;
        asignado = true; 
        console.log("Proceso " + nombreProceso + " agregado con éxito, tamaño: " + tamano);
        
        localStorage.setItem('particiones', JSON.stringify(particiones));
      }
    });
    if (!asignado) {
      console.log("No se pudo asignar el proceso " + nombreProceso);
    }
  } else {
    console.log("No se pudo obtener el tamaño del proceso " + nombreProceso);
  }
  return particiones;
}

function agregarNuevoProceso(titulo, text, data, bss) {
  const nuevoProceso = {
    titulo: titulo,
    text: text,
    data: data,
    bss: bss,
  };
  procesos.push(nuevoProceso);
  agregarProceso(nuevoProceso.titulo, particiones)
  console.log(nuevoProceso.titulo);

  return particiones;
}

function borrarProceso(nombreProceso, particiones) {
  const index = particiones.findIndex(particion => particion.tipo === nombreProceso);
  if (index !== -1) {
    particiones[index].tipo = 'Disponible';
    console.log("Proceso " + nombreProceso + " marcado como disponible");
    localStorage.setItem('particiones', JSON.stringify(particiones));
  } else {
    console.log("Proceso " + nombreProceso + " no encontrado");
  }
  return particiones;
}



module.exports = {
  agregarProceso,
  crearArregloMemoria,
  agregarNuevoProceso,
  borrarProceso,
};

