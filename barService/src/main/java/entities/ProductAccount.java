package entities;

import java.util.Objects;

public class ProductAccount {

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
