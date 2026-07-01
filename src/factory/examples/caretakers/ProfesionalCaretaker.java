package factory.examples.caretakers;

import java.util.Arrays;
import java.util.List;

public class ProfesionalCaretaker implements Caretaker {
    private final String name;
    public ProfesionalCaretaker(String name) { this.name = name; }
    @Override public String getRole() { return "Profesional"; }
    @Override public String getName() { return name; }
    @Override public List<String> allowedSpecies() { return Arrays.asList("Perro", "Gato", "Ave", "Roedor"); }
    @Override public boolean canAdministerMedication() { return true; }
    @Override public String describe() { return name + " [Profesional] - cuidado extendido + medicamentos"; }
}
