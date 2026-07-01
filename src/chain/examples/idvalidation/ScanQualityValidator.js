'use strict';

const IdValidator = require('./IdValidator');

class ScanQualityValidator extends IdValidator {
  check(doc) { return !!doc.scanHash && doc.scanHash.length >= 8 && doc.cleanBackground; }
  name()     { return 'ScanQualityValidator'; }
}

module.exports = ScanQualityValidator;
