'use strict';

class ProfesionalCaretaker {
  constructor(name) { this.name = name; }
  getRole()  { return 'Profesional'; }
  getName()  { return this.name; }
  allowedSpecies()          { return ['Perro', 'Gato', 'Ave', 'Roedor']; }
  canAdministerMedication() { return true; }
  describe() { return `${this.name} [Profesional] - cuidado extendido + medicamentos`; }
}

module.exports = ProfesionalCaretaker;
