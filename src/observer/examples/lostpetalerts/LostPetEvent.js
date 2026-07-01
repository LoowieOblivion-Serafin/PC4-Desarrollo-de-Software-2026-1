'use strict';

const Event = require('../../pattern/Event');

const EVENT_LOST_PET = 1;

class LostPetEvent extends Event {
  constructor(petName, origin, description) {
    super(EVENT_LOST_PET, description);
    this.petName = petName;
    this.origin = origin;
  }
}

LostPetEvent.EVENT_LOST_PET = EVENT_LOST_PET;
module.exports = LostPetEvent;
