package singleton.examples.caretakerservice;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import composite.examples.reviews.CaretakerReviews;
import composite.examples.reviews.RatingNode;
import factory.examples.caretakers.Caretaker;

/**
 * RNF3.2: independent service. Isolated from the alert system so peak
 * vacation demand does not affect RF1.4 alerts. Singleton keeps its own
 * bounded registry.
 */
public class CaretakerService {

    private static CaretakerService instance;

    private final List<Caretaker> caretakers = new ArrayList<>();
    private final List<CaretakerReviews> reviews = new ArrayList<>();
    private boolean publiclyEnabled;

    private CaretakerService() {}

    public static synchronized CaretakerService getInstance() {
        if (instance == null) instance = new CaretakerService();
        return instance;
    }

    public void enablePublicListing() { this.publiclyEnabled = true; }
    public boolean isPubliclyEnabled() { return publiclyEnabled; }

    public void register(Caretaker c, CaretakerReviews r) {
        caretakers.add(c);
        reviews.add(r);
    }

    public List<Caretaker> caretakers() { return Collections.unmodifiableList(caretakers); }

    public double ratingOf(int index) {
        RatingNode node = reviews.get(index);
        return node.averageRating();
    }
}
