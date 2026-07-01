package abstractfactory.examples.searchcatalog;

/**
 * Abstract Factory. Each concrete factory produces the family of catalogs
 * the backend can query. Keeps result sources swappable and consistent per
 * deployment (e.g. Peru vs Chile datasets).
 */
public abstract class CatalogFactory {
    public abstract ShelterCatalog createShelterCatalog();
    public abstract BreederCatalog createBreederCatalog();
    public abstract LostAlertsCatalog createLostAlertsCatalog();
}
