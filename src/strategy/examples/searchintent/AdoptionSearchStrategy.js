'use strict';

const SearchIntent = require('./SearchIntent');
const SearchResult = require('./SearchResult');

/** RF2.3: adopcion -> solo catalogo ONG/protectoras. */
class AdoptionSearchStrategy {
  constructor(factory) { this.factory = factory; }
  search(meta) {
    const matches = this.factory.createShelterCatalog().query(meta);
    return new SearchResult(SearchIntent.ADOPTION, matches);
  }
}

module.exports = AdoptionSearchStrategy;
