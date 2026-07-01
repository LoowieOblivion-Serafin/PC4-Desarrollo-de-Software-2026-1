package facade.examples.imagesearch;

import abstractfactory.examples.searchcatalog.CatalogFactory;
import abstractfactory.examples.searchcatalog.InMemoryCatalogFactory;
import adapter.examples.metadata.ImageMetadata;
import adapter.examples.metadata.MetadataAdapter;
import adapter.examples.metadata.RawImage;
import strategy.examples.searchintent.AdoptionSearchStrategy;
import strategy.examples.searchintent.SaleSearchStrategy;
import strategy.examples.searchintent.SearchIntent;
import strategy.examples.searchintent.SearchResult;
import strategy.examples.searchintent.SearchStrategy;
import strategy.examples.searchintent.VerifyLossSearchStrategy;

/**
 * RF2.1: single upload interface. Hides adapter + strategy + factory wiring.
 * RNF2.2: response measured; must stay under target window.
 */
public class ImageSearchFacade {

    private final MetadataAdapter adapter = new MetadataAdapter();
    private final CatalogFactory catalogFactory;

    public ImageSearchFacade() { this(new InMemoryCatalogFactory()); }

    public ImageSearchFacade(CatalogFactory catalogFactory) {
        this.catalogFactory = catalogFactory;
    }

    public SearchResult uploadAndSearch(RawImage rawImage, SearchIntent intent) {
        if (intent == null) throw new IllegalArgumentException("Intent required (RF2.2)");
        long start = System.currentTimeMillis();

        ImageMetadata meta = adapter.adapt(rawImage);
        SearchStrategy strategy = pickStrategy(intent);
        SearchResult result = strategy.search(meta);

        long elapsed = System.currentTimeMillis() - start;
        System.out.println("[ImageSearchFacade] intent=" + intent
                + " meta=" + meta.toJson() + " elapsedMs=" + elapsed);
        return result;
    }

    private SearchStrategy pickStrategy(SearchIntent intent) {
        switch (intent) {
            case ADOPTION:    return new AdoptionSearchStrategy(catalogFactory);
            case SALE:        return new SaleSearchStrategy(catalogFactory);
            case VERIFY_LOSS: return new VerifyLossSearchStrategy(catalogFactory);
            default: throw new IllegalStateException("Unknown intent: " + intent);
        }
    }
}
