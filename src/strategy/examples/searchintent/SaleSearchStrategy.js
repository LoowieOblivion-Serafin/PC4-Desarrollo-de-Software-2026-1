'use strict';

const SearchIntent = require('./SearchIntent');
const SearchResult = require('./SearchResult');

/** RF2.4: venta -> solo criaderos certificados. */
class SaleSearchStrategy {
  constructor(factory) { this.factory = factory; }
  search(meta) {
    const matches = this.factory.createBreederCatalog().query(meta);
    return new SearchResult(SearchIntent.SALE, matches);
  }
}

module.exports = SaleSearchStrategy;
