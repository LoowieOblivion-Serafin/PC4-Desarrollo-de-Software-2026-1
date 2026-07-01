package abstractfactory.examples.searchcatalog;

import java.util.List;

import adapter.examples.metadata.ImageMetadata;

/** RF2.5: active lost-pet alerts. */
public interface LostAlertsCatalog {
    List<String> query(ImageMetadata meta);
}
