var fs = require('fs');
var path = require('path');
var _ =  require('lodash');


var findValuesforID = (id)=>{

  return new Promise((resolve,reject)=>{

    var content = JSON.parse(fs.readFileSync(path.join(__dirname, "resources/apiUsers.json")));
    //should not do this async as its taking sometime to read the file, everything depends on this.
    // fs.readFile(path.join(__dirname, "resources/apiUsers.json"), (err, data) => {
    //   if (err) throw err;
    //   content = JSON.parse(data);
  
    //   console.log(`content here is =${JSON.stringify(content)}`);
    // });


    var idvalue = _.find(content, function(userObj){
      return userObj.id==id;
    });
    if(idvalue){
      resolve(idvalue);
    }else{
      reject("Invalid ID");
    }

  });
};


module.exports = { findValuesforID};




  

