"use strict";

const acl = require('..')(__dirname + '/config/acl');

describe('acl', function() {

  describe('(is|eq)[LevelName]()', function() {

    it('should reject invalid roles', function() {

      (function() {
        acl.isSuperAdmin(26);
      }).should.throw();

      (function() {
        acl.eqSuperAdmin(26);
      }).should.throw();

    });


    it('should accept valid roles', function() {

      acl.isAdmin(15).should.be.ok;
      acl.isAdmin(10).should.not.be.ok;
      acl.eqAdmin(15).should.be.ok;
      acl.eqAdmin(20).should.not.be.ok;

    });

  });

  describe('isAtLeast()', function() {

    it('should check if the level you have is at least the level you want', function() {
      acl.isAtLeast(acl.LEVELS.admin, acl.LEVELS.admin).should.be.ok;
      acl.isAtLeast(acl.LEVELS.cs, acl.LEVELS.admin).should.not.be.ok;
    });

  });

  describe('getLevelsAvailable()', function() {

    it ('should get only levels <= the given level', function() {
      let levs = acl.getLevelsAvailable(acl.LEVELS.unverified);
      levs.should.be.eql([{name: 'Disabled', value: -1}, {name: 'Unverified', value: 0}])
    });

  });

});