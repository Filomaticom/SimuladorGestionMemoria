const memorySize = 32; // Tamaño de la memoria en bloques
const memory = Array(memorySize).fill(false); // Inicializar la memoria como libre

// Procesos simulados con una pila de bloques asignados
const processes = [
    [5, 3, 7],  // Proceso 1 con bloques 5, 6, 7, 8, 9, 10, 11
    [15, 1, 2], // Proceso 2 con bloques 15, 16
    [25, 4, 6]  // Proceso 3 con bloques 25, 26, 27, 28, 29
];

function updateMemoryDisplay() {
    const memoryElement = document.getElementById("memory");
    memoryElement.innerHTML = "";
    memory.forEach((isAllocated, index) => {
        const block = document.createElement("div");
        block.className = "memory-block";
        if (isAllocated) {
            block.classList.add("allocated");
        }
        block.textContent = index.toString(); // Mostrar índice del bloque
        memoryElement.appendChild(block);
    });
}

// Asignar bloques de memoria para cada proceso
processes.forEach((process, processIndex) => {
    const stack = process.slice(1); // La primera posición es el índice base
    stack.forEach(offset => {
        memory[process[0] + offset] = true; // Marcar bloque como asignado
    });
});

updateMemoryDisplay(); // Actualizar la visualización inicial

