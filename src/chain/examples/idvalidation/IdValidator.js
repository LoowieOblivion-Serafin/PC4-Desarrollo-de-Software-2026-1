'use strict';

/** RNF3.1: Chain of Responsibility. Perfil habilitado solo si todo pasa. */
class IdValidator {
  constructor() { this.next = null; }

  linkWith(next) {
    this.next = next;
    return next;
  }

  validate(doc) {
    if (!this.check(doc)) {
      console.log(`  X rechazado en ${this.name()}`);
      return false;
    }
    console.log(`  OK ${this.name()}`);
    return this.next ? this.next.validate(doc) : true;
  }

  check(_doc) { throw new Error('not implemented'); }
  name()      { throw new Error('not implemented'); }
}

module.exports = IdValidator;
