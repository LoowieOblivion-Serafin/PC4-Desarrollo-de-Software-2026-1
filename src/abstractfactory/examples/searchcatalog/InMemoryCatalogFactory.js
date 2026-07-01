'use strict';

const CatalogFactory = require('./CatalogFactory');

/** Implementacion en memoria para demo local. */
class InMemoryCatalogFactory extends CatalogFactory {
  createShelterCatalog() {
    return {
      query(meta) {
        return [
          `ONG PatitasLibres - ${meta.species} ${meta.color}`,
          `Refugio SanFrancisco - ${meta.species}`,
        ];
      },
    };
  }

  createBreederCatalog() {
    return {
      query(meta) {
        return [
          `Criadero Certificado A (SENASA) - ${meta.species}`,
          `Criadero Certificado B (SENASA) - ${meta.species}`,
        ];
      },
    };
  }

  createLostAlertsCatalog() {
    return {
      query(meta) {
        return [
          `Alerta #1024 - ${meta.species} ${meta.color}`,
          `Alerta #1189 - ${meta.species}`,
        ];
      },
    };
  }
}

module.exports = InMemoryCatalogFactory;
