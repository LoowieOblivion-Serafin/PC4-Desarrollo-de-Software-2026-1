package chain.examples.idvalidation;

public class DniFormatValidator extends IdValidator {
    @Override protected boolean check(IdDocument doc) {
        return doc.getDni() != null && doc.getDni().matches("\\d{8}");
    }
    @Override protected String name() { return "DniFormatValidator"; }
}
