package abstractfactory.examples.searchcatalog;

import java.util.List;

import adapter.examples.metadata.ImageMetadata;

/** RF2.3: ONG / shelters only. */
public interface ShelterCatalog {
    List<String> query(ImageMetadata meta);
}
