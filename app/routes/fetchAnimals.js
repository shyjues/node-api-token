var fs = require('fs');
var path = require('path');

var _ = require('lodash');

function getAnimals(req, res){

    var content = JSON.parse(fs.readFileSync(path.join(__dirname, "../resources/animals.json")));

    var dogsAndCats = _.filter(content, function(animals){
        return animals.apiUserId===req.query.id;
    });

    var dogArray = [];
    var catArray = [];
    var groupDogAndCat = _.groupBy(dogsAndCats, 'type');

    groupDogAndCat.dog.forEach(element => {
        dogArray.push(element.name);
    });

    groupDogAndCat.cat.forEach(element => {
        catArray.push(element.name);
    });

    return res.send({
        "apiUserId":req.query.id,
        "animals":[
            {
                "type":"dog",
                "names":dogArray
            },
            {
                "type":"cat",
                "names":catArray
            }
        ]
    });
}

module.exports = {getAnimals};