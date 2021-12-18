const registerController = {};

registerController.nuevoPqrs = (req, res)=>{
    if(req.session.rol === 'USUARIO' || req.session.rol === 'ADMINISTRADOR'){
        res.render('newRegisterpqrs', { name:req.session.name, user: req.session.rol })
    }else{
        const sweetAlert = {
            control: true,
            title: 'Error',
            text: 'Debes iniciar sesión para usar cualquier funcionalidad.',
            icon: 'error',
            scButton: false,
            timer: 2000,
            ruta: 'login' 
        };
        res.render('login', {o: JSON.stringify(sweetAlert)});
    };
};

registerController.verRegistros = (req, res)=>{
    if(req.session.rol === 'USUARIO'){
        res.render('verRegistros', { name:req.session.name, user: req.session.rol })
    }else{
        const sweetAlert = {
            control: true,
            title: 'Error',
            text: 'Debes iniciar sesión para usar cualquier funcionalidad.',
            icon: 'error',
            scButton: false,
            timer: 2000,
            ruta: 'login' 
        };
        res.render('login', {o: JSON.stringify(sweetAlert)});
    };
};

module.exports = registerController;