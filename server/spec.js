var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE
// to run the test type mocha server/specs.js

describe('[LIONS]', function(){

  it('should GET all lions', function(done) {
    request(app)
      .get('/lions')
      .set('Accept', 'application/json')
      // expect below belongs to supertest
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        // this comes from chai
        expect(resp.body).to.be.an('array');
        done();
      })
  });

  it('should POST a lion', function(done) {
    request(app)
      .post('/lions')
      .send({
        name: 'Mufasa', 
        age: 111, 
        pride: 'Evil lions', 
        gender:'male'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err,res) {
        expect(res.body).to.be.an('object');
        done();
      })
  });

  it('should DELETE a lion', function(done) {
    request(app)
      // first I have to post in order to be able to later delete
      .post('/lions')
      .send({
        name: 'test lion', 
        age: 100, 
        pride: 'test lion', 
        gender: 'female'
      })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        var lion = res.body;
        request(app)
          .delete('/lions/' + lion.id)
          .end(function(err, res) {
            expect(res.body).to.eql(lion);
            done();
          })
      })
  })

  it('should UPDATE a lion', function(done) {
    request(app)
    .post('/lions')
      .send({
        name: 'test lion', 
        age: 100, 
        pride: 'test lion', 
        gender: 'female'
      })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        var lion = res.body;
        request(app)
          .put('/lions/' + lion.id)
          .send({
            name: 'new name'
          })
          .end(function(err, res) {
            expect(res.body.name).to.eql('new name');
            done();
          })
      })
  })

});


