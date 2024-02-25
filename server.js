const express = require('express');
const app = express();
const port = 3000;

// Simulación de la memoria RAM
class Memory {
    constructor(size) {
        this.size = size;
        this.blocks = [];
        this.init();
    }

    init() {
        for (let i = 0; i < this.size; i++) {
            this.blocks.push({ free: true });
        }
    }

    allocate(size) {
        let start = this.findFreeBlock(size);
        if (start !== -1) {
            for (let i = start; i < start + size; i++) {
                this.blocks[i].free = false;
            }
            return start;
        }
        return -1;
    }

    release(start, size) {
        for (let i = start; i < start + size; i++) {
            this.blocks[i].free = true;
        }
    }

    findFreeBlock(size) {
        for (let i = 0; i < this.size; i++) {
            if (this.blocks[i].free) {
                let blockEnd = i + size - 1;
                if (blockEnd < this.size && this.checkFreeBlocks(i, blockEnd)) {
                    return i;
                }
            }
        }
        return -1;
    }

    checkFreeBlocks(start, end) {
        for (let i = start; i <= end; i++) {
            if (!this.blocks[i].free) {
                return false;
            }
        }
        return true;
    }

    getStatus() {
        return this.blocks.map(block => block.free ? 'free' : 'allocated');
    }
}

let memory = new Memory(16 * 1024); // 16 MB en bytes

app.use(express.static('public'));

app.get('/memory', (req, res) => {
    res.json(memory.getStatus());
});

app.post('/allocate/:size', (req, res) => {
    let size = parseInt(req.params.size);
    let start = memory.allocate(size);
    if (start !== -1) {
        res.json({ success: true, start: start });
    } else {
        res.json({ success: false, message: 'No hay suficiente espacio disponible.' });
    }
});

app.post('/release/:start/:size', (req, res) => {
    let start = parseInt(req.params.start);
    let size = parseInt(req.params.size);
    memory.release(start, size);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
