package Resources;

public enum Days {

    MONDAY("MONDAY"), TUESDAY("TUESDAY"),WEDNESDAY("WEDNESDAY"),THURSDAY("THURSDAY"),FRIDAY("FRIDAY"),SATURDAY("SATURDAY"),SUNDAY("SUNDAY");

    private String day;
    Days(String day){
        this.day = day;
    }

    public String getDay() {
        return day;
    }
}
