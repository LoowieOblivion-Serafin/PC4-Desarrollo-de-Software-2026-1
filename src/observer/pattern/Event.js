'use strict';

class Event {
  constructor(type, description) {
    this.type = type;
    this.description = description;
    this.date = new Date();
  }

  getDate() { return this.date.toISOString(); }
}

module.exports = Event;
