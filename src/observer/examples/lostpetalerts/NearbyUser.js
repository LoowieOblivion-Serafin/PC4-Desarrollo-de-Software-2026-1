'use strict';

class NearbyUser {
  constructor(name, location) {
    this.name = name;
    this.location = location;
  }

  update(event) {
    if (event && event.petName) {
      console.log(`  -> ${this.name} recibe alerta por ${event.petName} en ${event.origin}: ${event.description}`);
    }
  }
}

module.exports = NearbyUser;
