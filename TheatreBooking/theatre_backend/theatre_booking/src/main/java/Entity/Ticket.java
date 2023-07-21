package Entity;

import com.google.type.DateTime;

public class Ticket {

    private Integer id;
    private String movie;
    private Float price;
    private Integer quantity;
    private DateTime showTime;

    public Ticket(Integer id, String movie, Float price, Integer quantity) {
        this.id = id;
        this.movie = movie;
        this.price = price;
        this.quantity = quantity;
//        this.showTime = showTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMovie() {
        return movie;
    }

    public void setMovie(String movie) {
        this.movie = movie;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public DateTime getShowTime() {
        return showTime;
    }

    public void setShowTime(DateTime showTime) {
        this.showTime = showTime;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "id=" + id +
                ", movie='" + movie + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", showTime=" + showTime +
                '}';
    }
}
