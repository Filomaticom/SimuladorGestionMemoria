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
const tamanoSO = 1048576; 

/
function obtenerTamanoParticion(tamanoUsuario) {
  if (tamanoUsuario <= 0) {
    console.error("El tamaño de la partición debe ser mayor a 0");
    return 0;
  }
  return Math.min(tamanoUsuario, tamanoMemoria - tamanoSO); 
}


let tamanoParticionUsuario = obtenerTamanoParticion(prompt("Ingrese el tamaño de la partición (en MB): "));
tamanoParticionUsuario *= 1024 * 1024; 


const numeroParticiones = Math.floor((tamanoMemoria - tamanoSO) / tamanoParticionUsuario) + 1;


const particiones = [];


particiones.push({
  tipo: "SO",
  tamano: tamanoSO,
  inicio: 0,
  fin: tamanoSO - 1,
});

for (let i = 1; i < numeroParticiones; i++) {
  const inicio = tamanoSO + (i - 1) * tamanoParticionUsuario;
  const fin = inicio + tamanoParticionUsuario - 1;
  particiones.push({
    tipo: "Regular",
    tamano: tamanoParticionUsuario,
    inicio,
    fin,
  });
}

for (const particion of particiones) {
  console.log(`Partición: ${particion.tipo}`);
  console.log(`Tamaño: ${particion.tamano} bytes`);
  console.log(`Inicio: ${particion.inicio}`);
  console.log(`Fin: ${particion.fin}`);
  console.log("---");
}

