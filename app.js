// Requires
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// BOE
// request = require("request"),    
// convert = require('xml-js');





// inicializar variables
var app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// ================================
// Body-Parser
// ================================
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//===========================================
//  Fin Body-Parser
//===========================================


// importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');

// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, db) => {
    if (err) throw err;

    console.log('Mongodb puerto 27017: \x1b[32m%s\x1b[0m', 'online');

});

// Server index config
// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));



// Rutas
// app.get('/', (req, res, next) => {

//     res.status(200).json({
//         ok: true,
//         mensaje: 'Peticion realizada correctamente'
//     });
// });
app.use('/usuario', usuarioRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);

app.use('/', appRoutes);



//escuchar peticiones

app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});



// // SUMARIO BOE
// var options = {
//     method: 'GET',
//     url: 'http://boe.es/diario_boe/xml.php',
//     qs: { id: 'BOE-S-20180409' },
//     headers: {
//         // 'Postman-Token': '23f87b57-17e0-47e3-97d8-cb6d4a300946',
//         'Cache-Control': 'no-cache'
//     }
// };

// request(options, function(error, response, body) {
//     if (error) throw new Error(error);
//     // res.status(200).body();
//     console.log(body);
//     var xml = body;

//     var result1 = convert.xml2json(xml, { compact: true, spaces: 4 });
//     console.log(result1);

// });