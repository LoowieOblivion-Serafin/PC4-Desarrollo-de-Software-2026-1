'use strict';

const CaretakerRole = require('./CaretakerRole');
const SolidarioCaretaker = require('./SolidarioCaretaker');
const ProfesionalCaretaker = require('./ProfesionalCaretaker');
const EspecializadoCaretaker = require('./EspecializadoCaretaker');

class CaretakerFactory {
  create(role, name, extra) {
    switch (role) {
      case CaretakerRole.SOLIDARIO:     return new SolidarioCaretaker(name);
      case CaretakerRole.PROFESIONAL:   return new ProfesionalCaretaker(name);
      case CaretakerRole.ESPECIALIZADO: return new EspecializadoCaretaker(name, extra);
      default: throw new Error(`Rol desconocido: ${role}`);
    }
  }
}

module.exports = CaretakerFactory;
