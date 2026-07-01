package observer.examples.lostpetalerts;

import java.util.ArrayList;
import java.util.List;

import observer.pattern.Event;
import observer.pattern.Observer;
import observer.pattern.Subject;
import petapp.domain.Location;

/**
 * RF1.4: notify users in configurable radius.
 * RNF1.1: distribute alert in less than 5 seconds.
 */
public class LostPetAlertService extends Subject {

    public static final int EVENT_LOST_PET = 1;

    private final List<NearbyUser> users = new ArrayList<>();

    public void register(NearbyUser user) { users.add(user); }
    public void unregister(NearbyUser user) { users.remove(user); }

    @Override
    public void attach(int eventType, Observer observer) {
        if (observer instanceof NearbyUser) register((NearbyUser) observer);
    }

    @Override
    public void detach(int eventType, Observer observer) {
        if (observer instanceof NearbyUser) unregister((NearbyUser) observer);
    }

    @Override
    public void notifyObserver(int eventType, Event event) {
        for (NearbyUser u : users) u.update(event);
    }

    public void broadcast(LostPetEvent event, Location origin, double radiusKm) {
        long start = System.currentTimeMillis();
        for (NearbyUser u : users) {
            if (u.getLocation().distanceKmTo(origin) <= radiusKm) {
                u.update(event);
            }
        }
        long elapsed = System.currentTimeMillis() - start;
        System.out.println("[LostPetAlertService] radius=" + radiusKm
                + "km delivered in " + elapsed + " ms (SLO <5000ms)");
        if (elapsed > 5000) System.err.println("SLO VIOLATED RNF1.1");
    }
}
