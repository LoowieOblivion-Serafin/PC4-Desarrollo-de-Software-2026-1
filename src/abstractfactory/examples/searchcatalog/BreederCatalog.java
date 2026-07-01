package abstractfactory.examples.searchcatalog;

import java.util.List;

import adapter.examples.metadata.ImageMetadata;

/** RF2.4: only legally certified breeders. */
public interface BreederCatalog {
    List<String> query(ImageMetadata meta);
}
