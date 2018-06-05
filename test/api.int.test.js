const chai = require('chai');
const expect = require('chai').expect;
const app = require('../app.js');
const bcrypt = require('bcrypt');

chai.use(require('chai-http'));

const testApi = function () {
    describe('API endpoint responses test', function () {
        this.timeout(5000);

        // GET - Listing of all users
        it('should return 401 since request is not authorized', function () {
            return chai.request(app)
                .get('/api/users')
                .then(function (res) {
                    expect(res).to.have.status(401);
                });
        });

        // GET - Listing of all activities
        it('should return 401 since request is not authorized', function () {
            return chai.request(app)
                .get('/api/activities')
                .then(function (res) {
                    expect(res).to.have.status(401);
                });
        });

        // GET - Listing of all messages
        it('should return 401 since request is not authorized', function () {
            return chai.request(app)
                .get('/api/messages')
                .then(function (res) {
                    expect(res).to.have.status(401);
                });
        });

        // Login
        it('should get authentication token for user whose login credentials is provided', function () {
            return chai.request(app)
                .post('/api/auth/login')
                .send({
                    'email': 'admin@notify.com',
                    'password': 'admin'
                })
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.user).to.be.an('object');
                    expect(res.body.user.token).to.not.be.empty;
                    authToken = res.body.user.token;
                });
        });

        it('should return all users since request is now authenticated', function () {
            return chai.request(app)
                .get('/api/users')
                .set('Authorization', 'Bearer ' + authToken)
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                });
        });

        it('should return all activities since request is now authenticated', function () {
            return chai.request(app)
                .get('/api/activities')
                .set('Authorization', 'Bearer ' + authToken)
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                });
        });

        it('should return all messages since request is now authenticated', function () {
            return chai.request(app)
                .get('/api/messages')
                .set('Authorization', 'Bearer ' + authToken)
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                });
        });
    });
};

module.exports = testApi;
