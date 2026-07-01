'use strict';

const OwnerContact = require('./OwnerContact');

/**
 * RNF1.2: datos personales del dueno permanecen anonimos para ciudadanos
 * que reportan avistamientos. Proxy oculta contacto real detras de alias.
 */
class AnonymousOwnerProxy extends OwnerContact {
  constructor(real, alias) {
    super();
    this._real = real;
    this.alias = alias;
  }
  getName()  { return this.alias; }
  getPhone() { return '[oculto]'; }
  getEmail() { return '[oculto]'; }

  _unwrap() { return this._real; }
}

module.exports = AnonymousOwnerProxy;
