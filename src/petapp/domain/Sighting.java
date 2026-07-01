package petapp.domain;

public class Sighting {

    private final String photoUrl;
    private final Location location;
    private final String anonymousReporterId;

    public Sighting(String photoUrl, Location location, String anonymousReporterId) {
        this.photoUrl = photoUrl;
        this.location = location;
        this.anonymousReporterId = anonymousReporterId;
    }

    public String getPhotoUrl() { return photoUrl; }
    public Location getLocation() { return location; }
    public String getAnonymousReporterId() { return anonymousReporterId; }
}
