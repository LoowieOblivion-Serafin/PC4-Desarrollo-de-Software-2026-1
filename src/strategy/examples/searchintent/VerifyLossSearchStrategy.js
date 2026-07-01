'use strict';

const SearchIntent = require('./SearchIntent');
const SearchResult = require('./SearchResult');

/** RF2.5: verificar perdida -> match contra alertas activas. */
class VerifyLossSearchStrategy {
  constructor(factory) { this.factory = factory; }
  search(meta) {
    const matches = this.factory.createLostAlertsCatalog().query(meta);
    return new SearchResult(SearchIntent.VERIFY_LOSS, matches);
  }
}

module.exports = VerifyLossSearchStrategy;
