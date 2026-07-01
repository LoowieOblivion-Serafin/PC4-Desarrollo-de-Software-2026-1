package petapp;

import java.util.Arrays;

import abstractfactory.examples.searchcatalog.InMemoryCatalogFactory;
import adapter.examples.metadata.RawImage;
import builder.examples.petreport.PetReport;
import builder.examples.petreport.PetReportBuilder;
import chain.examples.idvalidation.AgeValidator;
import chain.examples.idvalidation.DniFormatValidator;
import chain.examples.idvalidation.IdDocument;
import chain.examples.idvalidation.IdValidator;
import chain.examples.idvalidation.ScanQualityValidator;
import chain.examples.idvalidation.SelfieMatchValidator;
import composite.examples.reviews.CaretakerReviews;
import composite.examples.reviews.Review;
import decorator.examples.caretakerrestrictions.NoMedicationRestriction;
import decorator.examples.caretakerrestrictions.SizeRestriction;
import decorator.examples.caretakerrestrictions.SpeciesRestriction;
import facade.examples.imagesearch.ImageSearchFacade;
import factory.examples.caretakers.Caretaker;
import factory.examples.caretakers.CaretakerFactory;
import factory.examples.caretakers.CaretakerRole;
import observer.examples.lostpetalerts.LostPetAlertService;
import observer.examples.lostpetalerts.LostPetEvent;
import observer.examples.lostpetalerts.NearbyUser;
import petapp.domain.Location;
import petapp.domain.Owner;
import proxy.examples.owneranonymizer.AnonymousOwnerProxy;
import proxy.examples.owneranonymizer.OwnerContact;
import proxy.examples.owneranonymizer.RealOwnerContact;
import singleton.examples.caretakerservice.CaretakerService;
import state.examples.alerttoggle.AlertContext;
import strategy.examples.searchintent.SearchIntent;

public class App {

    public static void main(String[] args) {
        System.out.println("=========================================");
        System.out.println(" PetApp - demo de patrones GoF");
        System.out.println("=========================================\n");

        section1LostPets();
        section2ImageSearch();
        section3Caretakers();
    }

    // 1. Reporte y alertas.
    private static void section1LostPets() {
        System.out.println("--- 1. Reporte de mascota perdida + alertas ---");

        Owner owner = new Owner("Ana Perez", "999888777", "ana@mail.com", "12345678");
        PetReport report = new PetReportBuilder()      // RF1.1
                .withPet("Firulais", "Perro", "Labrador", "cdn/pic.jpg", "Collar rojo")
                .withOwner(owner)
                .withLocation(-12.0464, -77.0428)      // RF1.2
                .build();
        System.out.println("Reporte: " + report);

        // RNF1.2: vista publica anonimizada.
        OwnerContact publicView = new AnonymousOwnerProxy(new RealOwnerContact(owner), "Dueno#4821");
        System.out.println("Dueno (vista publica): " + publicView.getName()
                + " tel=" + publicView.getPhone());

        // RF1.4 + RNF1.1: notificar en radio de 1 km en <5s.
        LostPetAlertService alerts = new LostPetAlertService();
        NearbyUser alice = new NearbyUser("Alice", new Location(-12.0470, -77.0430));
        NearbyUser bob   = new NearbyUser("Bob",   new Location(-12.1500, -77.1500));
        NearbyUser carla = new NearbyUser("Carla", new Location(-12.0500, -77.0450));
        alerts.register(alice); alerts.register(bob); alerts.register(carla);

        LostPetEvent evt = new LostPetEvent("Firulais", report.getLocation(), "Labrador collar rojo");
        alerts.broadcast(evt, report.getLocation(), 1.0);

        // RF3.3: Bob apaga alertas via State.
        AlertContext ctx = new AlertContext(alerts, bob);
        ctx.toggle();   // OFF -> ON (registra)
        ctx.toggle();   // ON  -> OFF (desregistra)
        System.out.println("Estado Bob: " + ctx.getState().label());
        System.out.println();
    }

    // 2. Buscador por imagen.
    private static void section2ImageSearch() {
        System.out.println("--- 2. Buscador multiproposito por imagen ---");
        ImageSearchFacade facade = new ImageSearchFacade(new InMemoryCatalogFactory());
        RawImage img = new RawImage(new byte[]{9, 8, 7, 6}, "PNG");
        System.out.println(facade.uploadAndSearch(img, SearchIntent.ADOPTION));
        System.out.println(facade.uploadAndSearch(img, SearchIntent.SALE));
        System.out.println(facade.uploadAndSearch(img, SearchIntent.VERIFY_LOSS));
        System.out.println();
    }

    // 3. Red de cuidadores.
    private static void section3Caretakers() {
        System.out.println("--- 3. Red de cuidadores ---");
        CaretakerFactory factory = new CaretakerFactory();

        Caretaker base = factory.create(CaretakerRole.PROFESIONAL, "Luis", null);
        Caretaker decorated = new NoMedicationRestriction(
                new SpeciesRestriction(
                        new SizeRestriction(base, "medium"),
                        Arrays.asList("Perro", "Gato")));
        System.out.println(decorated.describe());

        // RNF3.1: validar DNI antes de habilitar.
        IdValidator chain = new DniFormatValidator();
        chain.linkWith(new AgeValidator())
             .linkWith(new ScanQualityValidator())
             .linkWith(new SelfieMatchValidator());

        IdDocument doc = new IdDocument("12345678", "abcd1234", "abcd9999", 24, true);
        boolean ok = chain.validate(doc);
        System.out.println("Validacion DNI: " + (ok ? "APROBADA" : "RECHAZADA"));

        // RF3.4: rating desde reseñas verificadas.
        CaretakerReviews reviews = new CaretakerReviews(base.getName());
        reviews.add(new Review("Ana", 5, true));
        reviews.add(new Review("Beto", 4, true));
        reviews.add(new Review("Cesar", 3, false));  // no verificada, se ignora

        // RNF3.2: servicio independiente.
        CaretakerService svc = CaretakerService.getInstance();
        svc.register(decorated, reviews);
        if (ok) svc.enablePublicListing();
        System.out.println("Servicio publico habilitado: " + svc.isPubliclyEnabled());
        System.out.println("Rating promedio: " + svc.ratingOf(0));
    }
}
