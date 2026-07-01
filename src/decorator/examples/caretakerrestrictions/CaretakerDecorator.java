package decorator.examples.caretakerrestrictions;

import java.util.List;

import factory.examples.caretakers.Caretaker;

public abstract class CaretakerDecorator implements Caretaker {

    protected final Caretaker wrapped;

    protected CaretakerDecorator(Caretaker wrapped) { this.wrapped = wrapped; }

    @Override public String getRole() { return wrapped.getRole(); }
    @Override public String getName() { return wrapped.getName(); }
    @Override public List<String> allowedSpecies() { return wrapped.allowedSpecies(); }
    @Override public boolean canAdministerMedication() { return wrapped.canAdministerMedication(); }
    @Override public String describe() { return wrapped.describe(); }
}
