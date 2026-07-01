package strategy.examples.searchintent;

import java.util.List;

import abstractfactory.examples.searchcatalog.CatalogFactory;
import adapter.examples.metadata.ImageMetadata;

/** RF2.4: sale -> only certified breeders. */
public class SaleSearchStrategy implements SearchStrategy {

    private final CatalogFactory factory;

    public SaleSearchStrategy(CatalogFactory factory) { this.factory = factory; }

    @Override
    public SearchResult search(ImageMetadata meta) {
        List<String> matches = factory.createBreederCatalog().query(meta);
        return new SearchResult(SearchIntent.SALE, matches);
    }
}
