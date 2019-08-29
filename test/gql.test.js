"use strict";
var chai = require('chai');
var expect = chai.expect;
var url = 'http://localhost:3001/';
var request = require('supertest')(url);
describe('GraphQL', function () {
    it('Returns user with id = 10', function (done) {
        request.post('/graphiql')
            // .send({ query: '{ calculatePrice(id: 10) { id name username email } }'})
            .send({ query: 'calculatePrice(type:"buy", margin : 0.2, exchangeRate :300)' })
            .expect(200)
            .end(function (err, res) {
            // res will contain array with one user
            if (err) {
                console.log("error in test", err);
                return done(err);
            }
            // res.body.user.should.have.property('id')
            // res.body.user.should.have.property('name')
            // res.body.user.should.have.property('username')
            // res.body.user.should.have.property('email')
            done();
        });
    });
    // it('Returns user with id = 10', (done) => {
    //     request.post('/graphql')
    //     .send({ query: '{ user(id: 10) { id name username email } }'})
    //     .expect(200)
    //     .end((err,res) => {
    //         // res will contain array with one user
    //         if (err) return done(err);
    //         res.body.user.should.have.property('id')
    //         res.body.user.should.have.property('name')
    //         res.body.user.should.have.property('username')
    //         res.body.user.should.have.property('email')
    //         done();
    //     })
    // })
    // it('Returns all users', (done) => {
    //     request.post('/graphql')
    //     .send({ query: '{ user { id name username email } }' })
    //     .expect(200)
    //     .end((err, res) => {
    //         // res will contain array of all users
    //         if (err) return done(err);
    //         // assume there are a 100 users in the database
    //         res.body.user.should.have.lengthOf(100);
    //     })  
    // })
});
