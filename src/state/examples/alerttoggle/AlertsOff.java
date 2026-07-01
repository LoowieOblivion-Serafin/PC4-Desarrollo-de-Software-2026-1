package state.examples.alerttoggle;

import observer.examples.lostpetalerts.LostPetEvent;

public class AlertsOff implements AlertToggleState {

    @Override
    public void toggle(AlertContext ctx) {
        ctx.getService().register(ctx.getUser());
        ctx.setState(new AlertsOn());
        System.out.println("[Toggle] " + ctx.getUser().getName() + " -> ON");
    }

    @Override
    public void deliver(AlertContext ctx, LostPetEvent event) {
        // Ignored while OFF.
    }

    @Override public String label() { return "OFF"; }
}
