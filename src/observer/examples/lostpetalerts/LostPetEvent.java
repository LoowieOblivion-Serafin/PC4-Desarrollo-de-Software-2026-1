package observer.examples.lostpetalerts;

import observer.pattern.Event;
import petapp.domain.Location;

public class LostPetEvent extends Event {

    private final String petName;
    private final Location origin;

    public LostPetEvent(String petName, Location origin, String description) {
        super(LostPetAlertService.EVENT_LOST_PET, description);
        this.petName = petName;
        this.origin = origin;
    }

    public String getPetName() { return petName; }
    public Location getOrigin() { return origin; }
}
