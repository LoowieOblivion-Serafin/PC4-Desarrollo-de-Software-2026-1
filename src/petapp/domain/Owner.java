package petapp.domain;

public class Owner {

    private final String fullName;
    private final String phone;
    private final String email;
    private final String dni;

    public Owner(String fullName, String phone, String email, String dni) {
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.dni = dni;
    }

    public String getFullName() { return fullName; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
    public String getDni() { return dni; }
}
