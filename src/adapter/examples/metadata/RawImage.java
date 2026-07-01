package adapter.examples.metadata;

/** Legacy / vendor-specific image object. Adaptee. */
public class RawImage {

    private final byte[] bytes;
    private final String vendorFormat;

    public RawImage(byte[] bytes, String vendorFormat) {
        this.bytes = bytes;
        this.vendorFormat = vendorFormat;
    }

    public byte[] getBytes() { return bytes; }
    public String getVendorFormat() { return vendorFormat; }
}
