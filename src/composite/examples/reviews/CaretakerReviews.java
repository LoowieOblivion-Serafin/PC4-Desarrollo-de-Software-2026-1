package composite.examples.reviews;

import java.util.ArrayList;
import java.util.List;

/**
 * Composite: caretaker profile aggregates verified reviews.
 * RF3.4: average rating computed only over verified entries.
 */
public class CaretakerReviews implements RatingNode {

    private final String caretakerName;
    private final List<RatingNode> children = new ArrayList<>();

    public CaretakerReviews(String caretakerName) { this.caretakerName = caretakerName; }

    public void add(RatingNode node) { children.add(node); }
    public void remove(RatingNode node) { children.remove(node); }

    @Override
    public double averageRating() {
        double sum = 0;
        int count = 0;
        for (RatingNode n : children) {
            sum += n.averageRating() * n.reviewCount();
            count += n.reviewCount();
        }
        return count == 0 ? 0.0 : sum / count;
    }

    @Override
    public int reviewCount() {
        int total = 0;
        for (RatingNode n : children) total += n.reviewCount();
        return total;
    }

    @Override public String label() { return caretakerName; }
}
