package strategy.examples.searchintent;

import java.util.List;

public class SearchResult {

    private final SearchIntent intent;
    private final List<String> matches;

    public SearchResult(SearchIntent intent, List<String> matches) {
        this.intent = intent;
        this.matches = matches;
    }

    public SearchIntent getIntent() { return intent; }
    public List<String> getMatches() { return matches; }

    @Override
    public String toString() {
        return "SearchResult{intent=" + intent + ", matches=" + matches + "}";
    }
}
