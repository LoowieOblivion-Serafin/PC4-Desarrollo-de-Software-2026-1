package chain.examples.idvalidation;

public class ScanQualityValidator extends IdValidator {
    @Override protected boolean check(IdDocument doc) {
        return doc.getScanHash() != null && doc.getScanHash().length() >= 8 && doc.isCleanBackground();
    }
    @Override protected String name() { return "ScanQualityValidator"; }
}
