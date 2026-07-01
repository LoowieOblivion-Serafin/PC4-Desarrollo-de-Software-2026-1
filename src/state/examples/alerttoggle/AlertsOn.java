package state.examples.alerttoggle;

import observer.examples.lostpetalerts.LostPetAlertService;
import observer.examples.lostpetalerts.LostPetEvent;

public class AlertsOn implements AlertToggleState {

    @Override
    public void toggle(AlertContext ctx) {
        ctx.getService().unregister(ctx.getUser());
        ctx.setState(new AlertsOff());
        System.out.println("[Toggle] " + ctx.getUser().getName() + " -> OFF");
    }

    @Override
    public void deliver(AlertContext ctx, LostPetEvent event) {
        ctx.getUser().update(event);
    }

    @Override public String label() { return "ON"; }
}
