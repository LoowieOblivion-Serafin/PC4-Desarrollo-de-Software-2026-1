package petapp.domain;

public class Pet {

    private final String name;
    private final String species;
    private final String breed;
    private final String photoUrl;
    private final String description;

    public Pet(String name, String species, String breed, String photoUrl, String description) {
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.photoUrl = photoUrl;
        this.description = description;
    }

    public String getName() { return name; }
    public String getSpecies() { return species; }
    public String getBreed() { return breed; }
    public String getPhotoUrl() { return photoUrl; }
    public String getDescription() { return description; }

    @Override
    public String toString() {
        return String.format("Pet{name=%s, species=%s, breed=%s}", name, species, breed);
    }
}
