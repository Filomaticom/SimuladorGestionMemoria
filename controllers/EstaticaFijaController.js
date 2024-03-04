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
const tamanoMemoria = 16 * 1024 * 1024; // 16 MB en bytes
const tamanoSO = 1 * 1024 * 1024; // 1 MB en bytes

// Función para obtener el tamaño de la partición
function obtenerTamanoParticion(tamanoUsuario) {
  if (tamanoUsuario <= 0) {
    console.error("El tamaño de la partición debe ser mayor a 0");
    return 0;
  }
  return Math.min(tamanoUsuario, Math.floor((tamanoMemoria - tamanoSO) / 2)); // Limitar al 50% de la memoria disponible
}

// Función para calcular el número de particiones
function calcularNumeroParticiones(tamanoParticion) {
  return Math.floor((tamanoMemoria - tamanoSO) / tamanoParticion);
}

// Obtener el tamaño de la partición del usuario
const tamanoParticionUsuario = obtenerTamanoParticion(4); // Tamaño de partición de 4 MB
tamanoParticionUsuario *= 1024 * 1024; // Convertir a bytes

// Calcular el número de particiones
const numeroParticiones = calcularNumeroParticiones(tamanoParticionUsuario);

// Crear un arreglo para almacenar las particiones
const particiones = [];

// Agregar la partición del sistema operativo
particiones.push({
  tipo: "SO",
  tamano: tamanoSO,
  inicio: 0,
  fin: tamanoSO - 1,
});

// Agregar las particiones regulares
for (let i = 1; i <= numeroParticiones; i++) {
  const inicio = tamanoSO + (i - 1) * tamanoParticionUsuario;
  const fin = inicio + tamanoParticionUsuario - 1;
  particiones.push({
    tipo: "Regular",
    tamano: tamanoParticionUsuario,
    inicio,
    fin,
  });
}

// Mostrar información de las particiones
for (const particion of particiones) {
  console.log(`Partición: ${particion.tipo}`);
  console.log(`Tamaño: ${particion.tamano} bytes`);
  console.log(`Inicio: ${particion.inicio}`);
  console.log(`Fin: ${particion.fin}`);
  console.log("---");
}




