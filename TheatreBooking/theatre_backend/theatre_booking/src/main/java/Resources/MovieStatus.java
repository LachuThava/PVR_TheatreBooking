package Resources;

public enum MovieStatus {
//new movie gonna show
    COMING_SOON("COMING_SOON"),
//    movie seats are booked
    CLOSED("CLOSED"),
//    you can register the movie
    AVAILABLE("AVAILABLE"),
//    movie gonna remove from the theatre
    NOT_AVAILABLE("NOT_AVAILABLE");




    private String status;
    MovieStatus(String movieStatus){
        this.status = movieStatus;
    }


    public String getStatus(){
        return this.status;
    }

}
