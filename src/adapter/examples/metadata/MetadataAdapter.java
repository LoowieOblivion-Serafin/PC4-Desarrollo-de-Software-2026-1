package adapter.examples.metadata;

/**
 * Adapter: converts a vendor RawImage into the standard ImageMetadata JSON
 * the backend expects (RNF2.1: engine intercambiable).
 */
public class MetadataAdapter {

    public ImageMetadata adapt(RawImage raw) {
        String mime = raw.getVendorFormat().equalsIgnoreCase("PNG") ? "image/png" : "image/jpeg";
        // Simulated vision analysis on raw bytes.
        int w = 800;
        int h = 600;
        String color = raw.getBytes().length % 2 == 0 ? "brown" : "black";
        String species = "dog";
        return new ImageMetadata(mime, w, h, color, species);
    }
}
