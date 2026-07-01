package abstractfactory.examples.searchcatalog;

import java.util.Arrays;
import java.util.List;

import adapter.examples.metadata.ImageMetadata;

/** Default in-memory implementation for local demo. */
public class InMemoryCatalogFactory extends CatalogFactory {

    @Override
    public ShelterCatalog createShelterCatalog() {
        return new ShelterCatalog() {
            @Override public List<String> query(ImageMetadata meta) {
                return Arrays.asList(
                        "ONG PatitasLibres - " + meta.getDetectedSpecies() + " " + meta.getDominantColor(),
                        "Refugio SanFrancisco - " + meta.getDetectedSpecies());
            }
        };
    }

    @Override
    public BreederCatalog createBreederCatalog() {
        return new BreederCatalog() {
            @Override public List<String> query(ImageMetadata meta) {
                return Arrays.asList(
                        "Criadero Certificado A (SENASA) - " + meta.getDetectedSpecies(),
                        "Criadero Certificado B (SENASA) - " + meta.getDetectedSpecies());
            }
        };
    }

    @Override
    public LostAlertsCatalog createLostAlertsCatalog() {
        return new LostAlertsCatalog() {
            @Override public List<String> query(ImageMetadata meta) {
                return Arrays.asList(
                        "Alerta #1024 - " + meta.getDetectedSpecies() + " " + meta.getDominantColor(),
                        "Alerta #1189 - " + meta.getDetectedSpecies());
            }
        };
    }
}
