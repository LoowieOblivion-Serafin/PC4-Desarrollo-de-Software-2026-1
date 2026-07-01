'use strict';

const IdValidator = require('./IdValidator');

class DniFormatValidator extends IdValidator {
  check(doc) { return /^\d{8}$/.test(doc.dni || ''); }
  name()     { return 'DniFormatValidator'; }
}

module.exports = DniFormatValidator;
