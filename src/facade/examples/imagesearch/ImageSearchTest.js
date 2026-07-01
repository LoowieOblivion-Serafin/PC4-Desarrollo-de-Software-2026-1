'use strict';

const ImageSearchFacade = require('./ImageSearchFacade');
const RawImage = require('../../../adapter/examples/metadata/RawImage');
const SearchIntent = require('../../../strategy/examples/searchintent/SearchIntent');

const facade = new ImageSearchFacade();
const img = new RawImage([1, 2, 3, 4], 'JPEG');

console.log(facade.uploadAndSearch(img, SearchIntent.ADOPTION).toString());
console.log(facade.uploadAndSearch(img, SearchIntent.SALE).toString());
console.log(facade.uploadAndSearch(img, SearchIntent.VERIFY_LOSS).toString());
