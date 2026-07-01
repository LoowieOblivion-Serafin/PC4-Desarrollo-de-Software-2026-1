'use strict';

const CaretakerDecorator = require('./CaretakerDecorator');

class SizeRestriction extends CaretakerDecorator {
  constructor(wrapped, maxSize) {
    super(wrapped);
    this.maxSize = maxSize;
  }
  describe() { return `${super.describe()} | Tamano max: ${this.maxSize}`; }
}

module.exports = SizeRestriction;
