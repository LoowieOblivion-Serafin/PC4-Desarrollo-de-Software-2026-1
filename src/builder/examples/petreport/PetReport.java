package builder.examples.petreport;

import petapp.domain.Location;
import petapp.domain.Owner;
import petapp.domain.Pet;

public class PetReport {

    private Pet pet;
    private Owner owner;
    private Location location;
    private long reportedAtEpochMs;

    public Pet getPet() { return pet; }
    public void setPet(Pet pet) { this.pet = pet; }

    public Owner getOwner() { return owner; }
    public void setOwner(Owner owner) { this.owner = owner; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }

    public long getReportedAtEpochMs() { return reportedAtEpochMs; }
    public void setReportedAtEpochMs(long reportedAtEpochMs) { this.reportedAtEpochMs = reportedAtEpochMs; }

    @Override
    public String toString() {
        return String.format("PetReport{%s, at=%s, by=%s}",
                pet, location, owner != null ? owner.getFullName() : "unknown");
    }
}
