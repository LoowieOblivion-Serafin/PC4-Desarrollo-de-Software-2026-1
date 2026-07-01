package builder.examples.petreport;

import petapp.domain.Owner;

public class PetReportTest {
    public static void main(String[] args) {
        PetReport report = new PetReportBuilder()
                .withPet("Firulais", "Perro", "Labrador", "http://cdn/pic.jpg", "Collar rojo, timido")
                .withOwner(new Owner("Ana Perez", "999999999", "ana@mail.com", "12345678"))
                .withLocation(-12.0464, -77.0428)
                .build();
        System.out.println(report);
    }
}
