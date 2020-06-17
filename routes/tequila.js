var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Tequila = require('../models/tequila');

router.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})


router.delete('/tequila',(req,res,next)=>{

    res.status(405).json({mensaje:"No permitido"});
});

router.delete('/tequila/:idTequila' , (req,res,next)=>{

    Tequila.findOneAndDelete({id: req.params.idTequila} , (err, datos)=>{
        if(err){
            res.status(404).json({mensaje:"No se ha encontrado el producto"});
        }else
        if(datos){

            res.status(200).json({mensaje: "Ok"})
        }
    });
});

router.patch('/tequila/:tequilaID', (request, responsive, next)=>{

    Tequila.findOneAndUpdate({id : request.params.tequilaID},{
        id : request.body.id,
        nombre : request.body.nombre,
        empresa : request.body.empresa,
        tipoAgave : request.body.tipoAgave,
        porcentajeAlcohol : request.body.porcentajeAlcohol,
        estadoOrigen : request.body.estadoOrigen,
        precio : request.body.precio
    },function(error,datos){
        if (error) {
            responsive.status(404).json({mensaje:"Error al guardar"});
        }else{
            responsive.status(201).json(datos);
        }
    });
});

module.exports = router;
