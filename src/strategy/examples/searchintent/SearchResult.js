'use strict';

class SearchResult {
  constructor(intent, matches) {
    this.intent = intent;
    this.matches = matches;
  }
  toString() { return `SearchResult{intent=${this.intent}, matches=${JSON.stringify(this.matches)}}`; }
}

module.exports = SearchResult;
