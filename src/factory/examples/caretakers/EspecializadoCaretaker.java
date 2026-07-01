package factory.examples.caretakers;

import java.util.Arrays;
import java.util.List;

public class EspecializadoCaretaker implements Caretaker {
    private final String name;
    private final String especialidad;
    public EspecializadoCaretaker(String name, String especialidad) {
        this.name = name;
        this.especialidad = especialidad;
    }
    @Override public String getRole() { return "Especializado"; }
    @Override public String getName() { return name; }
    @Override public List<String> allowedSpecies() { return Arrays.asList("Perro", "Gato", "Exotico"); }
    @Override public boolean canAdministerMedication() { return true; }
    @Override public String describe() {
        return name + " [Especializado:" + especialidad + "] - post-operatorio, dietas medicas";
    }
}
