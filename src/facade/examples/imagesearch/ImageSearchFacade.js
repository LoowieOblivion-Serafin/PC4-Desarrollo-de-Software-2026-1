'use strict';

const MetadataAdapter = require('../../../adapter/examples/metadata/MetadataAdapter');
const InMemoryCatalogFactory = require('../../../abstractfactory/examples/searchcatalog/InMemoryCatalogFactory');
const SearchIntent = require('../../../strategy/examples/searchintent/SearchIntent');
const AdoptionSearchStrategy = require('../../../strategy/examples/searchintent/AdoptionSearchStrategy');
const SaleSearchStrategy = require('../../../strategy/examples/searchintent/SaleSearchStrategy');
const VerifyLossSearchStrategy = require('../../../strategy/examples/searchintent/VerifyLossSearchStrategy');

/**
 * RF2.1: fachada unica para subir imagen + intent.
 * RNF2.2: mide latencia extremo a extremo.
 */
class ImageSearchFacade {
  constructor(catalogFactory) {
    this.adapter = new MetadataAdapter();
    this.catalogFactory = catalogFactory || new InMemoryCatalogFactory();
  }

  uploadAndSearch(rawImage, intent) {
    if (!intent) throw new Error('Intent requerido (RF2.2)');
    const start = Date.now();
    const meta = this.adapter.adapt(rawImage);
    const strategy = this._pickStrategy(intent);
    const result = strategy.search(meta);
    const elapsed = Date.now() - start;
    console.log(`[ImageSearchFacade] intent=${intent} meta=${meta.toJson()} elapsedMs=${elapsed}`);
    return result;
  }

  _pickStrategy(intent) {
    switch (intent) {
      case SearchIntent.ADOPTION:    return new AdoptionSearchStrategy(this.catalogFactory);
      case SearchIntent.SALE:        return new SaleSearchStrategy(this.catalogFactory);
      case SearchIntent.VERIFY_LOSS: return new VerifyLossSearchStrategy(this.catalogFactory);
      default: throw new Error(`Intent desconocido: ${intent}`);
    }
  }
}

module.exports = ImageSearchFacade;
