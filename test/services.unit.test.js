const chai = require('chai');
const expect = require('chai').expect;
const services = require('../src/services');
const bcrypt = require('bcrypt');

const testServices = function () {
    const UsersService = services.users;
    const ActivitiesService = services.activities;

    var authToken = '';

    describe('Service methods tests', function () {
        it('returns the user matching the given query', function () {
            UsersService.get({ id: 1 })
                .then(user => {
                    expect(user).to.be.an('object');
                    expect(user.name).to.equal('admin');
                });
        });

        it('saves user with given data', function () {
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

        it('returns all activities', function () {
            ActivitiesService.getAll({})
                .then(activities => {
                    expect(activities).to.be.an('array');
                });
        });

        var newId;

        it('adds an activity and gets it', function () {
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
};

module.exports = testServices;