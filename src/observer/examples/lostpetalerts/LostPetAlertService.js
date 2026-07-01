'use strict';

const Subject = require('../../pattern/Subject');
const LostPetEvent = require('./LostPetEvent');

/**
 * RF1.4: notifica a usuarios en radio configurable.
 * RNF1.1: distribucion en menos de 5 segundos.
 */
class LostPetAlertService extends Subject {
  constructor() {
    super();
    this.users = [];
  }

  register(user)   { this.users.push(user); }
  unregister(user) {
    const i = this.users.indexOf(user);
    if (i >= 0) this.users.splice(i, 1);
  }

  attach(_type, observer) { this.register(observer); }
  detach(_type, observer) { this.unregister(observer); }
  notifyObserver(_type, event) { this.users.forEach(u => u.update(event)); }

  broadcast(event, origin, radiusKm) {
    const start = Date.now();
    for (const u of this.users) {
      if (u.location.distanceKmTo(origin) <= radiusKm) u.update(event);
    }
    const elapsed = Date.now() - start;
    console.log(`[LostPetAlertService] radio=${radiusKm}km entregado en ${elapsed} ms (SLO <5000ms)`);
    if (elapsed > 5000) console.error('SLO VIOLADO RNF1.1');
  }
}

LostPetAlertService.EVENT_LOST_PET = LostPetEvent.EVENT_LOST_PET;
module.exports = LostPetAlertService;
