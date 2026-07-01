package decorator.examples.caretakerrestrictions;

import java.util.List;

import factory.examples.caretakers.Caretaker;

public class SpeciesRestriction extends CaretakerDecorator {

    private final List<String> onlySpecies;

    public SpeciesRestriction(Caretaker wrapped, List<String> onlySpecies) {
        super(wrapped);
        this.onlySpecies = onlySpecies;
    }

    @Override public List<String> allowedSpecies() { return onlySpecies; }

    @Override
    public String describe() {
        return super.describe() + " | Especies aceptadas: " + onlySpecies;
    }
}
