package observer.examples.lostpetalerts;

import petapp.domain.Location;

public class LostPetAlertsTest {
    public static void main(String[] args) {
        LostPetAlertService svc = new LostPetAlertService();
        Location center = new Location(-12.0464, -77.0428);

        svc.register(new NearbyUser("Alice",  new Location(-12.0470, -77.0430)));
        svc.register(new NearbyUser("Bob",    new Location(-12.1000, -77.1000)));
        svc.register(new NearbyUser("Carla",  new Location(-12.0500, -77.0450)));

        LostPetEvent evt = new LostPetEvent("Firulais", center, "Perro labrador, collar rojo");
        svc.broadcast(evt, center, 1.0);
    }
}
