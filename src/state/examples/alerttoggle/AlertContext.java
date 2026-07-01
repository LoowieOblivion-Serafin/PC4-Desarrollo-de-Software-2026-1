package state.examples.alerttoggle;

import observer.examples.lostpetalerts.LostPetAlertService;
import observer.examples.lostpetalerts.LostPetEvent;
import observer.examples.lostpetalerts.NearbyUser;

/**
 * RF3.3: toggle to activate/deactivate reception of alerts from RF1.4.
 */
public class AlertContext {

    private AlertToggleState state;
    private final LostPetAlertService service;
    private final NearbyUser user;

    public AlertContext(LostPetAlertService service, NearbyUser user) {
        this.service = service;
        this.user = user;
        this.state = new AlertsOff();
    }

    public void setState(AlertToggleState state) { this.state = state; }
    public AlertToggleState getState() { return state; }

    public LostPetAlertService getService() { return service; }
    public NearbyUser getUser() { return user; }

    public void toggle() { state.toggle(this); }
    public void deliver(LostPetEvent event) { state.deliver(this, event); }
}
