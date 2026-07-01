'use strict';

/** Abstract Factory: familia de catalogos intercambiables. */
class CatalogFactory {
  createShelterCatalog()    { throw new Error('not implemented'); }
  createBreederCatalog()    { throw new Error('not implemented'); }
  createLostAlertsCatalog() { throw new Error('not implemented'); }
}

module.exports = CatalogFactory;
