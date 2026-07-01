'use strict';

class CaretakerDecorator {
  constructor(wrapped) { this.wrapped = wrapped; }
  getRole()  { return this.wrapped.getRole(); }
  getName()  { return this.wrapped.getName(); }
  allowedSpecies()          { return this.wrapped.allowedSpecies(); }
  canAdministerMedication() { return this.wrapped.canAdministerMedication(); }
  describe() { return this.wrapped.describe(); }
}

module.exports = CaretakerDecorator;
