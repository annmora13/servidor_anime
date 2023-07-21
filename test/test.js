const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../index');
chai.use(chaiHttp);

describe('Testing REST API with Mocha - Chai', function(){
    it('Testing GET - The data must contain a property called 1 and this must be an object', function(done){
        chai
            .request(app)
            .get('/')
            .end(function (err, res) {
                let data = JSON.parse(res.text);
                chai.expect(data).to.have.property('4');
                chai.expect(data['4']).to.be.an('object');
                done();
            });
    });
});