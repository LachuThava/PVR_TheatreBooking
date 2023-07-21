package Service;

import Entity.Movie;
import Entity.MovieConfigiration;
import Entity.TicketBook;
import Resources.Days;
import Resources.MovieStatus;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class MovieService {

//movieName, director ,duration,status,releaseDate,likes,dislikes,comments
    public ArrayList<Movie> getMovies() throws ExecutionException, InterruptedException {
        Firestore DB = FirestoreClient.getFirestore();
        List<QueryDocumentSnapshot> list = DB.collection("movies").get().get().getDocuments();
        ArrayList<Movie> movies = new ArrayList<>();
        System.out.println(list);
        list.forEach((queryDocumentSnapshot -> System.out.println(queryDocumentSnapshot.getData())));
        list.forEach((movie)->{

                String movieName = (String) movie.get("Movie");
                String movieUrl = (String)movie.get("MovieUrl");
                String director = (String) movie.get("Director");
                String duration = (String) movie.get("Duration");
                String status = (String)movie.get("Status");
                Timestamp releaseDate = movie.getTimestamp("ReleaseDate").toSqlTimestamp();
                Timestamp closeDate = movie.getTimestamp("ClosingDate").toSqlTimestamp();
                Long likes = (Long) movie.get("Likes");
                Long disLikes = (Long) movie.get("DisLikes");
                List<String> comments = (ArrayList<String>) movie.get("Comments");
                List<Timestamp>timeTable = (ArrayList<Timestamp>)movie.get("TimeTable");
                Movie tempMovie = new Movie(movieName,movieUrl,director,duration, MovieStatus.valueOf(status),releaseDate,closeDate,likes.intValue(),disLikes.intValue(),comments,timeTable);
                movies.add(tempMovie);
        });

        return movies;

    }


    public Movie getMovie(String movie) throws ExecutionException, InterruptedException {
        Firestore  DB = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> movieDoc = DB.collection("movies").document(movie).get();
        System.out.println("Movie DATA : "+"   "+movieDoc.get().getData());
        Map<String,Object> movieDetails = movieDoc.get().getData();

        Movie movie1 = new Movie();

        movie1.setMovieName((String) movieDetails.get("Movie"));
        movie1.setCloseDate(((com.google.cloud.Timestamp) movieDetails.get("ClosingDate")).toSqlTimestamp());
        movie1.setReleaseDate(((com.google.cloud.Timestamp) movieDetails.get("ReleaseDate")).toSqlTimestamp());
        movie1.setMovieUrl(((String) movieDetails.get("MovieUrl")));
        movie1.setDirector((String) movieDetails.get("Director"));
        movie1.setDuration((String) movieDetails.get("Duration"));
        movie1.setStatus(MovieStatus.valueOf((String)movieDetails.get("Status")));
        Long likes = (Long) movieDetails.get("Likes");
        movie1.setLikes(likes.intValue());
        Long dislikes = (Long) movieDetails.get("DisLikes");
        movie1.setDislikes(dislikes.intValue());
        movie1.setComments((List<String>) movieDetails.get("Comments"));

        List<com.google.cloud.Timestamp> times = (List<com.google.cloud.Timestamp>) movieDetails.get("TimeTable");
        List<Timestamp> newTimes = new ArrayList<>();
        times.forEach((time)->{
            newTimes.add(time.toSqlTimestamp());
        });
        movie1.setTimeTable(newTimes);

        return movie1;

    }



    public List<String> getDays(){
        ArrayList<String> alist = new ArrayList<>();
        String [] times = {"10.30am","13.30pm","17.30pm","21.30pm"};
        Days [] days = {Days.MONDAY,Days.TUESDAY,Days.WEDNESDAY,Days.THURSDAY,Days.FRIDAY,Days.SATURDAY,Days.SUNDAY};
        for(Days day : days){
            for(String time: times){
                alist.add(day +" "+ time);
            }
        }
        return alist;
    }


    public String addMovie(MovieConfigiration movieConfigiration) throws ExecutionException, InterruptedException {

        Firestore DB = FirestoreClient.getFirestore();

        Map<String,Object>movieData = new HashMap<>();
        movieData.put("Movie",movieConfigiration.getMovieName());
        movieData.put("MovieUrl",movieConfigiration.getDirector());
        movieData.put("Director",movieConfigiration.getDirector());
        movieData.put("ReleaseDate", movieConfigiration.getReleaseDate());
        movieData.put("ClosingDate", movieConfigiration.getCloseDate());
        movieData.put("Duration",movieConfigiration.getDuration());
        movieData.put("Status",movieConfigiration.getStatus().getStatus());
        movieData.put("Likes",movieConfigiration.getLikes());
        movieData.put("DisLikes",movieConfigiration.getDislikes());
        movieData.put("Comments",movieConfigiration.getComments());

        LocalDate startTime = movieConfigiration.getReleaseDate().toLocalDateTime().toLocalDate();
        LocalDate endTime = movieConfigiration.getCloseDate().toLocalDateTime().toLocalDate();

        List<Timestamp> timeTable = findTimeTable(startTime,endTime,movieConfigiration.getTimeTable());
        movieData.put("TimeTable",timeTable);
        ApiFuture<WriteResult> writeResultApiFuture = DB.collection("movies").document(movieConfigiration.getMovieName()).set(movieData);
        return writeResultApiFuture.get().getUpdateTime().toString();
    }


    public List<Timestamp> findTimeTable(LocalDate startTime, LocalDate endTime,List<String> timetable) throws ExecutionException, InterruptedException {
        ArrayList<Timestamp> alist = new ArrayList<>();
        ArrayList<Timestamp> timeScheduleList = new ArrayList<>();
        Firestore DB = FirestoreClient.getFirestore();
        List<QueryDocumentSnapshot> movieList = DB.collection("movies").get().get().getDocuments();
        for(QueryDocumentSnapshot movieDoc : movieList){
            ArrayList<com.google.cloud.Timestamp> timeList = (ArrayList<com.google.cloud.Timestamp>) movieDoc.get("TimeTable");
            if(timeList != null){
                timeList.forEach(time->{
                    timeScheduleList.add(time.toSqlTimestamp());
                });
            }
        }

        for(String schdeule : timetable){
            String [] daytime = schdeule.split(" ");
            Days day = Days.valueOf(daytime[0]);
            String time = daytime[daytime.length-1];
            LocalDate temp = startTime;
            while(temp.isBefore(endTime)){
                if(temp.getDayOfWeek().toString().equals(day.getDay())){
                    Integer hour = Integer.valueOf(time.substring(0,2));
                    Integer min = Integer.valueOf(time.substring(3,5));
                    Integer seconds = Integer.valueOf("00");
                    LocalTime localTime = LocalTime.of(hour, min, seconds);
                    LocalDateTime localDateTime = LocalDateTime.of(temp, localTime);
                    Timestamp timestamp = Timestamp.valueOf(localDateTime);
                    if(!timeScheduleList.contains(timestamp)){
                    alist.add(timestamp);
                    }
                }
                temp = temp.plusDays(1);
            }
        }
        return alist;
    }


    public List<Timestamp> getMovieTimeTable(String movie) throws ExecutionException, InterruptedException {
        Firestore DB = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> documentSnapshot =  DB.collection("movies").document(movie).get();
        ArrayList<com.google.cloud.Timestamp> timeList = (ArrayList<com.google.cloud.Timestamp>) documentSnapshot.get().get("TimeTable");

        ArrayList<Timestamp> alist = new ArrayList<>();

        timeList.forEach((time)->{
            alist.add(time.toSqlTimestamp());
        });

        return alist;

    }


    public List<String> getBookingSeats(String movie, String date) throws ExecutionException, InterruptedException, ParseException {

        Firestore DB = FirestoreClient.getFirestore();

       com.google.cloud.Timestamp googleTime = com.google.cloud.Timestamp.parseTimestamp(date);
        SimpleDateFormat desiredDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");
        String dateTime = desiredDateFormat.format(googleTime.toDate());


        ArrayList<String> seats = new ArrayList<>();

        Iterable<CollectionReference> collections = DB.collection("Booking").document(movie).listCollections();

        List<QueryDocumentSnapshot> bookingList  = null;

        for(CollectionReference ref : collections) {
            if(ref.getId().equals(dateTime)){
                bookingList = ref.get().get().getDocuments();
                break;
            }
        }

        if(bookingList != null){
            for(QueryDocumentSnapshot userData : bookingList){
                for( String seat : (ArrayList<String>)userData.getData().get("seats")){
                    seats.add(seat);
                }
            }
        }


        return seats;


    }


    public String BookNow(TicketBook ticketBook) throws ExecutionException, InterruptedException {
        Firestore DB = FirestoreClient.getFirestore();
        boolean ticketUserExists = false;


        Map<String, Object> ticket = new HashMap<>();
        ticket.put("email", ticketBook.getEmail());
        ticket.put("movie", ticketBook.getMovieName());
        ticket.put("date", ticketBook.getDate());
        ticket.put("seats", ticketBook.getTicketSeats());

        Iterable<CollectionReference> collections =
                DB.collection("Booking").document(ticketBook.getMovieName()).listCollections();

        List<QueryDocumentSnapshot> bookingUsersList = null;
        String userReference = "";

        for (CollectionReference collRef : collections) {
            if (collRef.getId().equals(ticketBook.getDate().toString())) {
                bookingUsersList = collRef.get().get().getDocuments();
                break;
            }
        }

        Map<String, Object> userBookDetails = new HashMap<>();

        if (bookingUsersList != null) {
            for (QueryDocumentSnapshot queryDocumentSnapshot : bookingUsersList) {
                if (queryDocumentSnapshot.getData().get("email").equals(ticketBook.getEmail())) {
                    ticketUserExists = true;
                    userReference = queryDocumentSnapshot.getId().toString();
                    userBookDetails = queryDocumentSnapshot.getData();
                    break;
                }
            }
//                update the user details
            if (ticketUserExists) {
                ArrayList<String> oldSeats = (ArrayList<String>) userBookDetails.get("seats");
                ticketBook.getTicketSeats().forEach((seat) -> {
                    oldSeats.add(seat);
                });
                ApiFuture<WriteResult> savetheData = DB.collection("Booking").document(ticketBook.getMovieName()).collection(ticketBook.getDate().toString()).document(userReference).update("seats", oldSeats);
                return savetheData.get().getUpdateTime().toString();
            } else {
//                user is not there need to save in there
                ApiFuture<WriteResult> writeResultApiFuture = DB.collection("Booking").document(ticketBook.getMovieName()).collection(ticketBook.getDate().toString()).document().create(ticket);
                return writeResultApiFuture.get().getUpdateTime().toString();
            }

        } else {
//            "date is not there so save it there
            ApiFuture<WriteResult> writeResultApiFuture = DB.collection("Booking").document(ticketBook.getMovieName()).collection(ticketBook.getDate().toString()).document().create(ticket);
          return   writeResultApiFuture.get().getUpdateTime().toString();
        }

    }


}
