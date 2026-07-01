'use strict';

class SolidarioCaretaker {
  constructor(name) { this.name = name; }
  getRole()  { return 'Solidario'; }
  getName()  { return this.name; }
  allowedSpecies()          { return ['Perro', 'Gato']; }
  canAdministerMedication() { return false; }
  describe() { return `${this.name} [Solidario] - cuidado basico`; }
}

module.exports = SolidarioCaretaker;
