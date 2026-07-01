package decorator.examples.caretakerrestrictions;

import factory.examples.caretakers.Caretaker;

public class NoMedicationRestriction extends CaretakerDecorator {

    public NoMedicationRestriction(Caretaker wrapped) { super(wrapped); }

    @Override public boolean canAdministerMedication() { return false; }

    @Override
    public String describe() {
        return super.describe() + " | Rechaza administracion de medicamentos";
    }
}
