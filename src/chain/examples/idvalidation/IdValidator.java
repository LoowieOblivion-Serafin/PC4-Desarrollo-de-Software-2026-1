package chain.examples.idvalidation;

/**
 * RNF3.1: caretaker profile stays hidden until every check passes.
 * Chain of Responsibility.
 */
public abstract class IdValidator {

    protected IdValidator next;

    public IdValidator linkWith(IdValidator next) {
        this.next = next;
        return next;
    }

    public final boolean validate(IdDocument doc) {
        if (!check(doc)) {
            System.out.println("  X rechazado en " + name());
            return false;
        }
        System.out.println("  OK " + name());
        return next == null || next.validate(doc);
    }

    protected abstract boolean check(IdDocument doc);
    protected abstract String name();
}
