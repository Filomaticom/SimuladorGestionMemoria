
const express = require('express');
const path = require('path');
const { agregarProceso } = require('./controllers/EstaticaFijaController');
const { crearArregloMemoria } = require('./controllers/EstaticaFijaController');
const { agregarNuevoProceso } = require('./controllers/EstaticaFijaController');
const { borrarProceso } = require('./controllers/EstaticaFijaController');


const { agregarProcesoD } = require('./controllers/DinamicaCompactadaController');
const { crearArregloMemoriaD } = require('./controllers/DinamicaCompactadaController');
const { agregarNuevoProcesoD} = require('./controllers/DinamicaCompactadaController');
const { borrarProcesoD} = require('./controllers/DinamicaCompactadaController');



let particiones = crearArregloMemoria()
let particionesD = crearArregloMemoriaD()


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


app.post('/agregarProcesoD', (req, res) => {
  const nombreProceso = req.body.nombreProceso;
  agregarProcesoD(nombreProceso, particionesD);
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

app.post('/agregarNuevoProcesoD', (req, res) => {
  const { titulo, text, data, bss } = req.body;
  agregarNuevoProcesoD(titulo, text, data, bss);
  res.redirect('back');
});


app.post('/borrarProceso', (req, res) => {
  const nombreProceso = req.body.nombreProceso;
  borrarProceso(nombreProceso, particiones);
  res.redirect('back');
});


app.post('/borrarProcesoD', (req, res) => {
  const nombreProceso = req.body.nombreProceso;
  borrarProcesoD(nombreProceso, particionesD);
  res.redirect('back');
});


app.get('/', (req, res) => {
  res.render('index', );
});


app.get('/dinamicacompactada', (req, res) => {
  res.render('DinamicaCompactada.ejs', { particionesD });
});

app.get('/estaticafija', (req, res) => {
  res.render('EstaticaFija.ejs', { particiones: particiones });
});


app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});