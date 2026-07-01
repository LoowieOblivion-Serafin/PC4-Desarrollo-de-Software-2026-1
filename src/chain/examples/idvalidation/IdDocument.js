'use strict';

class IdDocument {
  constructor({ dni, scanHash, selfieHash, ageYears, cleanBackground }) {
    this.dni = dni;
    this.scanHash = scanHash;
    this.selfieHash = selfieHash;
    this.ageYears = ageYears;
    this.cleanBackground = cleanBackground;
  }
}

module.exports = IdDocument;
