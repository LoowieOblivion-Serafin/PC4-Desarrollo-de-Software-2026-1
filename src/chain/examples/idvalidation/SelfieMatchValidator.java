package chain.examples.idvalidation;

public class SelfieMatchValidator extends IdValidator {
    @Override protected boolean check(IdDocument doc) {
        return doc.getSelfieHash() != null
                && doc.getScanHash() != null
                && doc.getSelfieHash().charAt(0) == doc.getScanHash().charAt(0);
    }
    @Override protected String name() { return "SelfieMatchValidator"; }
}
