package observer.examples.lostpetalerts;

import observer.pattern.Event;
import observer.pattern.Observer;
import petapp.domain.Location;

public class NearbyUser implements Observer {

    private final String name;
    private final Location location;

    public NearbyUser(String name, Location location) {
        this.name = name;
        this.location = location;
    }

    public String getName() { return name; }
    public Location getLocation() { return location; }

    @Override
    public void update(Event event) {
        if (event instanceof LostPetEvent) {
            LostPetEvent e = (LostPetEvent) event;
            System.out.println("  -> " + name + " received alert for " + e.getPetName()
                    + " near " + e.getOrigin() + ": " + e.getDescription());
        }
    }
}
