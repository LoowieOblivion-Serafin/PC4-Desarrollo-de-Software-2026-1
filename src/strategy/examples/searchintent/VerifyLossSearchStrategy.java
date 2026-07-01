package strategy.examples.searchintent;

import java.util.List;

import abstractfactory.examples.searchcatalog.CatalogFactory;
import adapter.examples.metadata.ImageMetadata;

/** RF2.5: verify loss -> match against active lost-pet alerts. */
public class VerifyLossSearchStrategy implements SearchStrategy {

    private final CatalogFactory factory;

    public VerifyLossSearchStrategy(CatalogFactory factory) { this.factory = factory; }

    @Override
    public SearchResult search(ImageMetadata meta) {
        List<String> matches = factory.createLostAlertsCatalog().query(meta);
        return new SearchResult(SearchIntent.VERIFY_LOSS, matches);
    }
}
