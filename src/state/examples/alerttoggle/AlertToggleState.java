package state.examples.alerttoggle;

import observer.examples.lostpetalerts.LostPetEvent;

public interface AlertToggleState {
    void toggle(AlertContext ctx);
    void deliver(AlertContext ctx, LostPetEvent event);
    String label();
}
