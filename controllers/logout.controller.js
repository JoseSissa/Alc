const logoutController = {};

logoutController.cerrarSesion = (req, res)=>{
        req.session.destroy();
        res.redirect('login');
    };

module.exports = logoutController;