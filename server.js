
const express = require('express');
const path = require('path');
const { agregarProceso } = require('./controllers/EstaticaFijaController');
const { crearArregloMemoria } = require('./controllers/EstaticaFijaController');
const { agregarNuevoProceso } = require('./controllers/EstaticaFijaController');
let particiones = crearArregloMemoria(3)



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views",__dirname + "/views");

app.post('/agregarProceso', (req, res) => {
  const nombreProceso = req.body.nombreProceso;
  agregarProceso(nombreProceso, particiones);
  res.redirect('back');
});

app.post('/setTamanoParticiones', (req, res) => {
  const tamanoParticiones = parseInt(req.body.tamanoParticiones);
  particiones = crearArregloMemoria(tamanoParticiones);
  res.redirect('back');
});

app.post('/agregarNuevoProceso', (req, res) => {
  const { titulo, text, data, bss } = req.body;
  agregarNuevoProceso(titulo, text, data, bss);
  res.redirect('back');
});

app.get('/', (req, res) => {
  res.render('index', );
});


app.get('/estaticafija', (req, res) => {
  res.render('EstaticaFija.ejs', { particiones });
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});