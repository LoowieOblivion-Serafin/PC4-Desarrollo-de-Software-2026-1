package builder.examples.petreport;

import petapp.domain.Location;
import petapp.domain.Owner;
import petapp.domain.Pet;

public class PetReportBuilder {

    private final PetReport report = new PetReport();

    public PetReportBuilder withPet(String name, String species, String breed, String photoUrl, String description) {
        report.setPet(new Pet(name, species, breed, photoUrl, description));
        return this;
    }

    public PetReportBuilder withOwner(Owner owner) {
        report.setOwner(owner);
        return this;
    }

    public PetReportBuilder withLocation(double lat, double lon) {
        report.setLocation(new Location(lat, lon));
        return this;
    }

    public PetReportBuilder withTimestamp(long epochMs) {
        report.setReportedAtEpochMs(epochMs);
        return this;
    }

    public PetReport build() {
        if (report.getPet() == null) throw new IllegalStateException("Pet required (RF1.1)");
        if (report.getLocation() == null) throw new IllegalStateException("Location required (RF1.2)");
        if (report.getReportedAtEpochMs() == 0) report.setReportedAtEpochMs(System.currentTimeMillis());
        return report;
    }
}
