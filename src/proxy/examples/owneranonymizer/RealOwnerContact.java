package proxy.examples.owneranonymizer;

import petapp.domain.Owner;

public class RealOwnerContact implements OwnerContact {

    private final Owner owner;

    public RealOwnerContact(Owner owner) { this.owner = owner; }

    @Override public String getName()  { return owner.getFullName(); }
    @Override public String getPhone() { return owner.getPhone(); }
    @Override public String getEmail() { return owner.getEmail(); }
}
