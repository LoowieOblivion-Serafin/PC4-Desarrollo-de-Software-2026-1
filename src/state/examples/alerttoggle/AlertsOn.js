'use strict';

class AlertsOn {
  toggle(ctx) {
    ctx.service.unregister(ctx.user);
    const AlertsOff = require('./AlertsOff');
    ctx.setState(new AlertsOff());
    console.log(`[Toggle] ${ctx.user.name} -> OFF`);
  }
  deliver(ctx, event) { ctx.user.update(event); }
  label() { return 'ON'; }
}

module.exports = AlertsOn;
