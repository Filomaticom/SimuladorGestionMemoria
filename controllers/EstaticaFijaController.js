const procesos = [
  {
    titulo: "Proceso 1",
    texto: "Descripción del proceso 1",
    data: "Información específica del proceso 1",
    bss: "100", 
    stack: "200", 
    heap: "300", 
  },
  {
    titulo: "Proceso 2",
    texto: "Descripción del proceso 2",
    data: "Información específica del proceso 2",
    bss: "150",
    stack: "250", 
    heap: "350", 
  },

];
const tamanoMemoria = 16 * 1024 * 1024; 
const tamanoSO = 1 * 1024 * 1024; 


function crearArregloMemoria(tamanoParticionUsuario) {
  const tamanoParticionUsuarioBytes = tamanoParticionUsuario * 1024 * 1024; 


  if (tamanoParticionUsuarioBytes <= 0 || tamanoParticionUsuarioBytes >= tamanoMemoria - tamanoSO) {
    console.error("Tamaño de partición inválido");
    return null;
  }

  const particiones = [];

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
      tipo: "Usuario",
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
      tipo: "Usuario",
      tamano: tamanoUltimaParticion,
      inicio: inicioUsuario,
      fin: tamanoMemoria - 1,
    });
  }

  return particiones;
}


const tamanoParticionUsuario = 4;
const particiones = crearArregloMemoria(tamanoParticionUsuario);

if (particiones) {
  for (const particion of particiones) {
    console.log(`Partición: ${particion.tipo}`);
    console.log(`Tamaño: ${particion.tamano} bytes`);
    console.log(`Inicio: ${particion.inicio}`);
    console.log(`Fin: ${particion.fin}`);
    console.log("---");
  }
}





