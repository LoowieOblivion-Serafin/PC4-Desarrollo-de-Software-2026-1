package composite.examples.reviews;

/** Base component: anything that yields a numeric rating. */
public interface RatingNode {
    double averageRating();
    int reviewCount();
    String label();
}
