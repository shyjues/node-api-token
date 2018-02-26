

function numberPatterns(req, res){

    var n = 100;

    var numArray = [];

    for(var i =1;i<=n;i++){

        if(i%3==0 && i%5==0){
            numArray.push('HeyYo');
        }else if(i%3==0){
            numArray.push('Hey');
        }else if(i%5==0){
            numArray.push('Yo');
        }else{
            numArray.push(i);
        }
    }

    res.send(numArray);

}

module.exports = {numberPatterns};