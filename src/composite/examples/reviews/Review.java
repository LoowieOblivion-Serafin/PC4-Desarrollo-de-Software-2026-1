package composite.examples.reviews;

/** Leaf: single verified review from an owner. */
public class Review implements RatingNode {

    private final String ownerName;
    private final int stars;
    private final boolean verified;

    public Review(String ownerName, int stars, boolean verified) {
        if (stars < 1 || stars > 5) throw new IllegalArgumentException("stars 1..5");
        this.ownerName = ownerName;
        this.stars = stars;
        this.verified = verified;
    }

    public boolean isVerified() { return verified; }

    @Override public double averageRating() { return verified ? stars : 0.0; }
    @Override public int reviewCount() { return verified ? 1 : 0; }
    @Override public String label() { return ownerName + " (" + stars + "*)"; }
}
