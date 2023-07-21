package Entity;

import com.google.cloud.firestore.annotation.DocumentId;

import java.sql.Timestamp;
import java.util.List;

public class TicketBook {

    @DocumentId
    private String email;
    private String movieName;
    private Timestamp date;
    private List<String> ticketSeats;

    public TicketBook(String email, String movieName, Timestamp date, List<String> ticketSeats) {
        this.email = email;
        this.movieName = movieName;
        this.date = date;
        this.ticketSeats = ticketSeats;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public List<String> getTicketSeats() {
        return ticketSeats;
    }

    public void setTicketSeats(List<String> ticketSeats) {
        this.ticketSeats = ticketSeats;
    }
}
