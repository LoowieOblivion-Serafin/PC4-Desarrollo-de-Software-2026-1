'use strict';

const CaretakerDecorator = require('./CaretakerDecorator');

class NoMedicationRestriction extends CaretakerDecorator {
  canAdministerMedication() { return false; }
  describe() { return `${super.describe()} | Rechaza administracion de medicamentos`; }
}

module.exports = NoMedicationRestriction;
