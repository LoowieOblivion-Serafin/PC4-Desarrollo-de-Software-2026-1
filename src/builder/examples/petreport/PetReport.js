'use strict';

class PetReport {
  constructor() {
    this.pet = null;
    this.owner = null;
    this.location = null;
    this.reportedAtEpochMs = 0;
  }

  toString() {
    const at = this.location ? this.location.toString() : '?';
    const by = this.owner ? this.owner.fullName : 'unknown';
    return `PetReport{${this.pet}, at=${at}, by=${by}}`;
  }
}

module.exports = PetReport;
