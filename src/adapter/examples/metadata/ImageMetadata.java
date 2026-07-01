package adapter.examples.metadata;

/**
 * RNF2.1: standard JSON-like metadata format the search engine consumes.
 * Any engine (current or future) receives the same shape.
 */
public class ImageMetadata {

    private final String mimeType;
    private final int widthPx;
    private final int heightPx;
    private final String dominantColor;
    private final String detectedSpecies;

    public ImageMetadata(String mimeType, int widthPx, int heightPx,
                         String dominantColor, String detectedSpecies) {
        this.mimeType = mimeType;
        this.widthPx = widthPx;
        this.heightPx = heightPx;
        this.dominantColor = dominantColor;
        this.detectedSpecies = detectedSpecies;
    }

    public String toJson() {
        return "{\"mime\":\"" + mimeType + "\",\"w\":" + widthPx + ",\"h\":" + heightPx
                + ",\"color\":\"" + dominantColor + "\",\"species\":\"" + detectedSpecies + "\"}";
    }

    public String getDetectedSpecies() { return detectedSpecies; }
    public String getDominantColor() { return dominantColor; }
    public String getMimeType() { return mimeType; }
}
