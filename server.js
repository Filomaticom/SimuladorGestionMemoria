
const express = require('express');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views",__dirname + "/views");

app.get('/', (req, res) => {
  res.render('index', );
});
app.post('/estaticafija', (req, res) => {
  res.render('EstaticaFija', );
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});