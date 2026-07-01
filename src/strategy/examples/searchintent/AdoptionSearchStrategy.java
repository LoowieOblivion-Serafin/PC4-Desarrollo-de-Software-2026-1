package strategy.examples.searchintent;

import java.util.List;

import abstractfactory.examples.searchcatalog.CatalogFactory;
import adapter.examples.metadata.ImageMetadata;

/** RF2.3: adoption -> only ONG / shelters catalog. */
public class AdoptionSearchStrategy implements SearchStrategy {

    private final CatalogFactory factory;

    public AdoptionSearchStrategy(CatalogFactory factory) { this.factory = factory; }

    @Override
    public SearchResult search(ImageMetadata meta) {
        List<String> matches = factory.createShelterCatalog().query(meta);
        return new SearchResult(SearchIntent.ADOPTION, matches);
    }
}
