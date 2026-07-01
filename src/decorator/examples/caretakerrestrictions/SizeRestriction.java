package decorator.examples.caretakerrestrictions;

import factory.examples.caretakers.Caretaker;

public class SizeRestriction extends CaretakerDecorator {

    private final String maxSize; // small, medium, large

    public SizeRestriction(Caretaker wrapped, String maxSize) {
        super(wrapped);
        this.maxSize = maxSize;
    }

    @Override
    public String describe() {
        return super.describe() + " | Tamaño max: " + maxSize;
    }
}
