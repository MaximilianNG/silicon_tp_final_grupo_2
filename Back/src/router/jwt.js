function verificarToken(req, res, next){
    const BearerHeader= req.headers['authorization']
    if(typeof BearerHeader!=='undefined'){
        const bearerToken= BearerHeader.split(" ")[1]
        req.token = bearerToken;
        next();
    }else{
         res.send('Autentíquese primero.');
    }
}

module.exports = verificarToken;