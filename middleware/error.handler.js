const boomError = (err, req, res, next)=>{
    if(err.isBoom){
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    };
    next(err);
};

const errorGeneral = (err, req, res, next)=>{
    console.log(`TENEMOS UN ERROR Y FUE DETECTADO POR EL MIDDLEWARE: ${err}`);
    res.json({
        message: err.message,
    });
};

module.export  = { boomError, errorGeneral };