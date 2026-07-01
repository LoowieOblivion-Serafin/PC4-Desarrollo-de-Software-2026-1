'use strict';

const OwnerContact = require('./OwnerContact');

class RealOwnerContact extends OwnerContact {
  constructor(owner) {
    super();
    this.owner = owner;
  }
  getName()  { return this.owner.fullName; }
  getPhone() { return this.owner.phone; }
  getEmail() { return this.owner.email; }
}

module.exports = RealOwnerContact;
