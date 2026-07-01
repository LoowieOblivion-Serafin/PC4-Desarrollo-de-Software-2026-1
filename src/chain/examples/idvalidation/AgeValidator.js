'use strict';

const IdValidator = require('./IdValidator');

class AgeValidator extends IdValidator {
  check(doc) { return doc.ageYears >= 18; }
  name()     { return 'AgeValidator'; }
}

module.exports = AgeValidator;
