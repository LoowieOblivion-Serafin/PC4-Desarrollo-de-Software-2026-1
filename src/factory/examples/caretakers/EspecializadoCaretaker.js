'use strict';

class EspecializadoCaretaker {
  constructor(name, especialidad) {
    this.name = name;
    this.especialidad = especialidad || 'general';
  }
  getRole()  { return 'Especializado'; }
  getName()  { return this.name; }
  allowedSpecies()          { return ['Perro', 'Gato', 'Exotico']; }
  canAdministerMedication() { return true; }
  describe() { return `${this.name} [Especializado:${this.especialidad}] - post-operatorio, dietas medicas`; }
}

module.exports = EspecializadoCaretaker;
