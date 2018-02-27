const request = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const should = chai.should();

var app = require('./server').app;
chai.use(chaiHttp);

it('Should return 404 response',(done)=>{
    
    chai.request(app)
    .get('/')
    .end((err,res)=>
        {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.have.property('Error');
        res.body.Error.should.equal('URI not found');
        done();
      }
    );
});


it('Should return the token',(done)=>{
    request(app)
    .post('/signin')
    .set("Content-Type", "application/json")
    .send({'id':'test2', 'apiClientId': 'QqTitbH6tzcLrrPx', 'apiSecretKey': 'ERbvmnFtPjZNtToHjux7VEdh'})
    .end((err, res)=>{
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('token');
        res.body.should.have.property('expires');
        done();
    });
});