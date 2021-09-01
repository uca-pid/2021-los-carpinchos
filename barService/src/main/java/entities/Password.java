package entities;

import java.util.Objects;

public class Password {

    private int passwordId;
    private int barId;
    private String password;


    public int getPasswordId() {
        return passwordId;
    }

    public void setPasswordId(int passwordId) {
        this.passwordId = passwordId;
    }

    public int getBarId() {
        return barId;
    }

    public void setBarId(int barId) {
        this.barId = barId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Password)) return false;
        Password password1 = (Password) o;
        return getPasswordId() == password1.getPasswordId() && getBarId() == password1.getBarId() && getPassword().equals(password1.getPassword());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getPasswordId(), getBarId(), getPassword());
    }

    @Override
    public String toString() {
        return "Password{" +
                "passwordId=" + passwordId +
                ", barId=" + barId +
                ", password='" + password + '\'' +
                '}';
    }
}
