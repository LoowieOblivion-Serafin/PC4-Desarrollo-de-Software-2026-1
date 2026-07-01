package chain.examples.idvalidation;

public class IdDocument {

    private final String dni;
    private final String scanHash;
    private final String selfieHash;
    private final int ageYears;
    private final boolean cleanBackground;

    public IdDocument(String dni, String scanHash, String selfieHash, int ageYears, boolean cleanBackground) {
        this.dni = dni;
        this.scanHash = scanHash;
        this.selfieHash = selfieHash;
        this.ageYears = ageYears;
        this.cleanBackground = cleanBackground;
    }

    public String getDni() { return dni; }
    public String getScanHash() { return scanHash; }
    public String getSelfieHash() { return selfieHash; }
    public int getAgeYears() { return ageYears; }
    public boolean isCleanBackground() { return cleanBackground; }
}
