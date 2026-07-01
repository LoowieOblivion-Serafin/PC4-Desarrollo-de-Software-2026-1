'use strict';

/** RNF2.1: esquema JSON estandar consumido por el buscador. */
class ImageMetadata {
  constructor({ mime, w, h, color, species }) {
    this.mime = mime;
    this.w = w;
    this.h = h;
    this.color = color;
    this.species = species;
  }
  toJson() { return JSON.stringify(this); }
}

module.exports = ImageMetadata;
