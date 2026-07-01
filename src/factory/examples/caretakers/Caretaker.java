package factory.examples.caretakers;

import java.util.List;

public interface Caretaker {
    String getRole();
    String getName();
    List<String> allowedSpecies();
    boolean canAdministerMedication();
    String describe();
}
