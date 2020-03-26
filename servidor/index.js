const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const plantillaPdf = require('./documentos');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//POST - generacion del pdf y obtencion de los datos

app.post('/crear-pdf', (peticion, respuesta) => {
    console.log("datos: ", peticion.body);
    pdf.create(plantillaPdf(peticion.body), {}).toFile('resultado.pdf', (err) => {
        if(err){
            respuesta.send(Promise.reject());
        }

        respuesta.send(Promise.resolve());
    });
});

//GET - enviar el pdf generado al cliente

app.get('/enviar-pdf', (peticion, respuesta) => {
    respuesta.sendFile(`${__dirname}/resultado.pdf`);
});

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));