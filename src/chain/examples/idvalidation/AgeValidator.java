package chain.examples.idvalidation;

public class AgeValidator extends IdValidator {
    @Override protected boolean check(IdDocument doc) { return doc.getAgeYears() >= 18; }
    @Override protected String name() { return "AgeValidator"; }
}
