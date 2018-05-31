'use strict'

const chai = require('chai');
const expect = require('chai').expect;
const app = require('../app.js');
const services = require('../src/services');
const bcrypt = require('bcrypt');
const UsersService = services.users;
const ActivitiesService = services.activities;

var authToken = '';

chai.use(require('chai-http'));


describe('API endpoint responses test', function() {
    this.timeout(5000);

    // GET - Listing of all users
    it('should return 401 since request is not authorized', function() {
        return chai.request(app)
            .get('/api/users')
            .then(function(res) {
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
    it('should get authentication token for user whose login credentials is provided', function() {
        return chai.request(app)
            .post('/api/auth/login')
            .send({
                'email': 'admin@notify.com',
                'password': 'admin'
            })
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.user).to.be.an('object');
                expect(res.body.user.token).to.not.be.empty;
                authToken = res.body.user.token;
            });
    });

    it('should return all users since request is now authenticated', function() {
        return chai.request(app)
            .get('/api/users')
            .set('Authorization', 'Bearer ' + authToken)
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
            });
    });

    it('should return all activities since request is now authenticated', function() {
        return chai.request(app)
            .get('/api/activities')
            .set('Authorization', 'Bearer ' + authToken)
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
            });
    });

    it('should return all messages since request is now authenticated', function() {
        return chai.request(app)
            .get('/api/messages')
            .set('Authorization', 'Bearer ' + authToken)
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
            });
    });
});

describe('Service methods tests', function() {
    it('returns the user matching the given query', function() {
        UsersService.get({ id: 1 })
            .then(user => {
                expect(user).to.be.an('object');
                expect(user.name).to.equal('admin');
            });
    });

    it('saves user with given data', function() {
        var password = bcrypt.hashSync('richie', 10);
        UsersService.save({
            name: 'richman',
            password: password,
            email: 'richman@notify.com',
            role: 'user'
        }).then(user => {
            expect(user).to.be.an('object');
            expect(user.name).to.equal('richman');
        });
    });

    it('returns all activities', function() {
        ActivitiesService.getAll({})
            .then(activities => {
                expect(activities).to.be.an('array');
            });
    });

    var newId;

    it('adds an activity and gets it', function() {
        ActivitiesService.save({
            type: 'statistic',
            subType: 'event',
            message: 'number_field_updated',
            from_id: 2,
            to_id: 1
        }).then(activity => {
            expect(activity).to.be.an('object');
            expect(activity.type).to.equal('statistic');
            newId = activity.id;

            it('gets an activity matching given query', function () {
                ActivitiesService.get({
                    id: newId
                }).then(activity => {
                    expect(activity).to.be.an('object');
                    expect(activity.id).to.equal(newId);
                });
            });
        });
    });
});