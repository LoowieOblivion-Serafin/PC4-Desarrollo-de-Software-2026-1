'use strict';

const AlertsOff = require('./AlertsOff');

/** RF3.3: toggle para activar/desactivar recepcion de alertas de RF1.4. */
class AlertContext {
  constructor(service, user) {
    this.service = service;
    this.user = user;
    this.state = new AlertsOff();
  }
  setState(state) { this.state = state; }
  toggle()        { this.state.toggle(this); }
  deliver(event)  { this.state.deliver(this, event); }
}

module.exports = AlertContext;
