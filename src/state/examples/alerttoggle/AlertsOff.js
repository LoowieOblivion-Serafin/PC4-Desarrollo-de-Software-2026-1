'use strict';

class AlertsOff {
  toggle(ctx) {
    ctx.service.register(ctx.user);
    const AlertsOn = require('./AlertsOn');
    ctx.setState(new AlertsOn());
    console.log(`[Toggle] ${ctx.user.name} -> ON`);
  }
  deliver(_ctx, _event) { /* ignorado mientras OFF */ }
  label() { return 'OFF'; }
}

module.exports = AlertsOff;
