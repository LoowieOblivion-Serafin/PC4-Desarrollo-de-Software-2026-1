package factory.examples.caretakers;

import java.util.Arrays;
import java.util.List;

public class SolidarioCaretaker implements Caretaker {
    private final String name;
    public SolidarioCaretaker(String name) { this.name = name; }
    @Override public String getRole() { return "Solidario"; }
    @Override public String getName() { return name; }
    @Override public List<String> allowedSpecies() { return Arrays.asList("Perro", "Gato"); }
    @Override public boolean canAdministerMedication() { return false; }
    @Override public String describe() { return name + " [Solidario] - cuidado basico"; }
}
