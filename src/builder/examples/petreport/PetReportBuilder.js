'use strict';

const PetReport = require('./PetReport');
const Pet = require('../../../petapp/domain/Pet');
const Location = require('../../../petapp/domain/Location');

class PetReportBuilder {
  constructor() {
    this.report = new PetReport();
  }

  withPet(name, species, breed, photoUrl, description) {
    this.report.pet = new Pet(name, species, breed, photoUrl, description);
    return this;
  }

  withOwner(owner) {
    this.report.owner = owner;
    return this;
  }

  withLocation(lat, lon) {
    this.report.location = new Location(lat, lon);
    return this;
  }

  withTimestamp(epochMs) {
    this.report.reportedAtEpochMs = epochMs;
    return this;
  }

  build() {
    if (!this.report.pet)      throw new Error('Pet required (RF1.1)');
    if (!this.report.location) throw new Error('Location required (RF1.2)');
    if (!this.report.reportedAtEpochMs) this.report.reportedAtEpochMs = Date.now();
    return this.report;
  }
}

module.exports = PetReportBuilder;
