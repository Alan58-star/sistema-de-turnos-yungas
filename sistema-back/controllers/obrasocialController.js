const ObraSocial = require('../models/ObraSocial');
exports.crearObra = async(req,res) => {
    try{
        let obra;
        //Creamos Medico
        obra = new ObraSocial(req.body);
        await obra.save();
        res.send(obra);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.obtenerObras = async(req,res) => {
    try{
        const obras = await ObraSocial.find();
        res.send(obras);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.actualizarObra = async(req,res) => {
    try{
        const obra = await ObraSocial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

         if(!obra){
            res.status(404).json({msg: 'No existe el medico'});
        }

       
        res.json(obra);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerObra = async(req,res) => {
    try{
        let obra =  await ObraSocial.findById(req.params.id);
        if(!obra){
            res.status(404).json({msg: 'No existe el medico'});
        }
        res.json(obra);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.eliminarObra = async(req,res) => {
    try{
        let obra =  await ObraSocial.findById(req.params.id);
        if(!obra){
            res.status(404).json({msg: 'No existe el medico'});
        }
        await ObraSocial.deleteOne({_id:req.params.id});
        res.json({msg: ' Obra eliminado'});

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}