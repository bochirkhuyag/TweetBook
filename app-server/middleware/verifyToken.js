
const verifyToken = function(){
    return function(req, res, next){
        console.log("verify token");
                const authorizationHeader = req.headers['authorization'];
                if( authorizationHeader !== undefined ){
                    //get token                    
                    req.token = authorizationHeader.split(' ')[1];
                    next();
                } else {
                    res.sendStatus(403);
                }
            }
}

module.exports = verifyToken;