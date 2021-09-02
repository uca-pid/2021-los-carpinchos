package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class ProductAccount {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="PRODUCTACC_SEQ")
    private int barId;
    private int productId;


    public int getBarId() {
        return barId;
    }

    public void setBarId(int barId) {
        this.barId = barId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProductAccount)) return false;
        ProductAccount that = (ProductAccount) o;
        return getBarId() == that.getBarId() && getProductId() == that.getProductId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getBarId(), getProductId());
    }

    @Override
    public String toString() {
        return "ProductAccount{" +
                "barId=" + barId +
                ", productId=" + productId +
                '}';
    }
}
