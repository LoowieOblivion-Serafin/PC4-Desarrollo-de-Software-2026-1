'use strict';

class RawImage {
  constructor(bytes, vendorFormat) {
    this.bytes = bytes;
    this.vendorFormat = vendorFormat;
  }
}

module.exports = RawImage;
