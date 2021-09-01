package entities;


import java.util.Objects;

public class Account {

    private int id;
    private String name;
    private String manager;
    private String email;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Account)) return false;
        Account account = (Account) o;
        return getId() == account.getId() && getName().equals(account.getName()) && getManager().equals(account.getManager()) && getEmail().equals(account.getEmail());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getManager(), getEmail());
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", manager='" + manager + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
