var jwt = require('jwt-simple');
var util = require('../util');
var _ = require('lodash');


function login(req,res){
  
    var id = req.body.id;
    var apiClientId = req.body.apiClientId || '';
    var apiSecretKey = req.body.apiSecretKey || '';

    if (apiClientId == '' || apiSecretKey == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    // Fire a query to your DB and check if the credentials are valid
    //var userObj = validateUser(id,apiClientId, apiSecretKey);
    var userObj;

    validateUser(id, apiClientId, apiSecretKey).then((result)=>{
      console.log('validate user return '+JSON.stringify(result));
      userObj = result;
      res.json(genToken(userObj));
    }).catch((errMsg)=>{
      console.log(errMsg);
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    })

    
}


// private method
function genToken(user) {
  var expires = expiresIn(); // in 1 minute
  var token = jwt.encode({
    exp: expires
  }, require('./secret')());

  return {
    token: token,
    expires: expires,
    id: user.id
  };
}

//expires in 1 minute
function expiresIn() {
  
  return (Date.now()+60000);
}


function validateUser(id,apiClientId, apiSecretKey){

  return new Promise((resolve,reject)=>{

    util.findValuesforID(id).then((res)=>{
      console.log('validate user '+res);
      resolve(res);
    }).catch((errMsg)=>{
      console.log(errMsg);
      reject(errMsg);
    });

  });

}

module.exports = {login, validateUser};
