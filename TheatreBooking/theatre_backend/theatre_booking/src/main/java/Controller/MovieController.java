package Controller;

import Entity.Movie;
import Entity.MovieConfigiration;
import Entity.TicketBook;
import Service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin("*")
@RestController
public class MovieController {

    private MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService){
    this.movieService = movieService;
}


    @RequestMapping(path = "/getMovies",method = RequestMethod.GET)
        public ArrayList<Movie> getMovies() throws ExecutionException, InterruptedException {
        return movieService.getMovies();
    }

    @RequestMapping(path = "/getMovie/{movie}",method = RequestMethod.GET)
    public Movie getMovie(@PathVariable("movie") String movie) throws ExecutionException, InterruptedException {
        return movieService.getMovie(movie);
    }



    @RequestMapping(path = "/addMovie", method = RequestMethod.POST)
    public void addMovie(@RequestBody MovieConfigiration movieConfigiration) throws ExecutionException, InterruptedException {
        movieService.addMovie(movieConfigiration);
    }

    @RequestMapping(path="/days",method = RequestMethod.GET)
    public List<String> getDays(){
        return movieService.getDays();
    }


    @RequestMapping(path = "/getTimeTable/{movie}",method = RequestMethod.GET)
    public List<Timestamp> getMovieTimeTable(@PathVariable("movie") String movie) throws ExecutionException, InterruptedException {
        return movieService.getMovieTimeTable(movie);
    }


    @RequestMapping(path = "/Booking/{movie}/{date}", method = RequestMethod.GET)
    public List<String> getBookingSeats(@PathVariable("movie") String movie, @PathVariable("date") String date) throws ExecutionException, InterruptedException, ParseException {
        return movieService.getBookingSeats(movie,date);
    }

    @RequestMapping(path = "/Booking", method = RequestMethod.POST)
    public String Booking(@RequestBody TicketBook ticketBook) throws ExecutionException, InterruptedException {
        return movieService.BookNow(ticketBook);
    }


}
