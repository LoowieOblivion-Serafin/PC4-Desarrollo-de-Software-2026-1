'use strict';

const IdValidator = require('./IdValidator');

class SelfieMatchValidator extends IdValidator {
  check(doc) {
    return !!doc.selfieHash && !!doc.scanHash && doc.selfieHash[0] === doc.scanHash[0];
  }
  name() { return 'SelfieMatchValidator'; }
}

module.exports = SelfieMatchValidator;
