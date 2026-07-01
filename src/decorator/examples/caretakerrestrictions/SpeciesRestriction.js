'use strict';

const CaretakerDecorator = require('./CaretakerDecorator');

class SpeciesRestriction extends CaretakerDecorator {
  constructor(wrapped, onlySpecies) {
    super(wrapped);
    this.onlySpecies = onlySpecies;
  }
  allowedSpecies() { return this.onlySpecies; }
  describe() { return `${super.describe()} | Especies aceptadas: ${JSON.stringify(this.onlySpecies)}`; }
}

module.exports = SpeciesRestriction;
