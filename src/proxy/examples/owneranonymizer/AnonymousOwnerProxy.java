package proxy.examples.owneranonymizer;

/**
 * RNF1.2: keep owner personal data anonymous for anonymous sighting reporters.
 * Proxy hides real contact details behind a public alias.
 */
public class AnonymousOwnerProxy implements OwnerContact {

    private final RealOwnerContact real;
    private final String alias;

    public AnonymousOwnerProxy(RealOwnerContact real, String alias) {
        this.real = real;
        this.alias = alias;
    }

    @Override public String getName()  { return alias; }
    @Override public String getPhone() { return "[oculto]"; }
    @Override public String getEmail() { return "[oculto]"; }

    /** Only authenticated flow may unwrap (not exposed to public API). */
    RealOwnerContact unwrap() { return real; }
}
