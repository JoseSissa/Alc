const indexController = {};

indexController.usuario = (req, res)=>{
    if (req.session.rol === 'USUARIO' ){
        res.render('user', { name:req.session.name, user: req.session.rol });
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

indexController.administrador = (req, res)=>{
    if (req.session.rol === 'ADMINSTRADOR' ){
        res.render('admin', { name:req.session.name, user: req.session.rol })
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


module.exports = indexController;