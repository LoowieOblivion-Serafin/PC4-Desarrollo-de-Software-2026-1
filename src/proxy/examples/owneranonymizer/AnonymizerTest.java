package proxy.examples.owneranonymizer;

import petapp.domain.Owner;

public class AnonymizerTest {
    public static void main(String[] args) {
        Owner owner = new Owner("Ana Perez", "999999999", "ana@mail.com", "12345678");
        OwnerContact publicView = new AnonymousOwnerProxy(new RealOwnerContact(owner), "Dueno#4821");
        System.out.println("Public view: " + publicView.getName()
                + " / phone=" + publicView.getPhone()
                + " / email=" + publicView.getEmail());
    }
}
