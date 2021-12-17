const indexController = {};

module.exports = indexController;

indexController.usuario = (req, res)=>{
    res.render('indexUser', { user: req.session.rol});
};

indexController.administrador = (req, res)=>{
    res.render('indexAdmin');
};