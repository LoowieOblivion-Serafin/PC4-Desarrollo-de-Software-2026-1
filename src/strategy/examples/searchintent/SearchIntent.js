'use strict';

/** RF2.2: exactamente uno de tres intents. */
const SearchIntent = Object.freeze({
  ADOPTION: 'ADOPTION',
  SALE: 'SALE',
  VERIFY_LOSS: 'VERIFY_LOSS',
});

module.exports = SearchIntent;
