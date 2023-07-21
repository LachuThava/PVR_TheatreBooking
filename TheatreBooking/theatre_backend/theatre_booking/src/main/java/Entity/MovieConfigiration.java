package Entity;

import Resources.MovieStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.google.cloud.firestore.annotation.DocumentId;

import java.sql.Timestamp;
import java.util.List;

public class MovieConfigiration {

    @DocumentId
    private String movieName;

    private String movieUrl;
    private String director;
    private String duration;
    private MovieStatus status;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss",shape = JsonFormat.Shape.STRING)
    private Timestamp releaseDate;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss",shape = JsonFormat.Shape.STRING)
    private Timestamp closeDate;
    private Integer likes;
    private Integer dislikes;
    private List<String> comments;
    private List<String> timeTable;

    public MovieConfigiration(String movieName, String movieUrl, String director, String duration, MovieStatus status, Timestamp releaseDate, Timestamp closeDate, Integer likes, Integer dislikes, List<String> comments, List<String> timeTable) {
        this.movieName = movieName;
        this.movieUrl = movieUrl;
        this.director = director;
        this.duration = duration;
        this.status = status;
        this.releaseDate = releaseDate;
        this.closeDate = closeDate;
        this.likes = likes;
        this.dislikes = dislikes;
        this.comments = comments;
        this.timeTable = timeTable;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public String getMovieUrl() {
        return movieUrl;
    }

    public void setMovieUrl(String movieUrl) {
        this.movieUrl = movieUrl;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public MovieStatus getStatus() {
        return status;
    }

    public void setStatus(MovieStatus status) {
        this.status = status;
    }

    public Timestamp getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Timestamp releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Timestamp getCloseDate() {
        return closeDate;
    }

    public void setCloseDate(Timestamp closeDate) {
        this.closeDate = closeDate;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public Integer getDislikes() {
        return dislikes;
    }

    public void setDislikes(Integer dislikes) {
        this.dislikes = dislikes;
    }

    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }

    public List<String> getTimeTable() {
        return timeTable;
    }

    public void setTimeTable(List<String> timeTable) {
        this.timeTable = timeTable;
    }
}
