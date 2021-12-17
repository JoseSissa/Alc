const inicioRouter = require('./inicio.router');
const loginRouter = require('./login.router');


const routerApi =(app, connection)=>{
    app.use('/', inicioRouter)
    app.use('/login', loginRouter);
};

module.exports = routerApi;