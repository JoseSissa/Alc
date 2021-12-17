class RegisterService {
    register(){
        if(req.session.tipoUser == 'ADMINISTRADOR'){
            res.render('register');
        }else if (req.session.tipoUser == 'USUARIO'){
            res.render('indexUser');
        }else{
            res.render('login')
        }
    }
}

module.exports = RegisterService;