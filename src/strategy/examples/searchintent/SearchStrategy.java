package strategy.examples.searchintent;

import adapter.examples.metadata.ImageMetadata;

public interface SearchStrategy {
    SearchResult search(ImageMetadata meta);
}
