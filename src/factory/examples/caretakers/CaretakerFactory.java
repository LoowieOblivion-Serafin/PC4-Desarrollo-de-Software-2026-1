package factory.examples.caretakers;

public class CaretakerFactory {
    public Caretaker create(CaretakerRole role, String name, String extra) {
        switch (role) {
            case SOLIDARIO:    return new SolidarioCaretaker(name);
            case PROFESIONAL:  return new ProfesionalCaretaker(name);
            case ESPECIALIZADO: return new EspecializadoCaretaker(name, extra == null ? "general" : extra);
            default: throw new IllegalArgumentException("Rol desconocido: " + role);
        }
    }
}
