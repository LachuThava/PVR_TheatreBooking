package Entity;

import Resources.Gender;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class User {

    public String name;
    public String email;
    public String role = "user";
    public String password;
    public String uid;
    public Gender gender;
    public Integer age;
    public List<Map<String,Object>> ticketList;

    public User() {

    }



    public User(String name,String email,String uid,String role,Gender gender,Integer age,List<Map<String,Object>>ticketList){
        this.name = name;
        this.email = email;
        this.uid = uid;
        this.role = role;
        this.gender = gender;
        this.age = age;
        this.ticketList = ticketList;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public List<Map<String,Object>> getTicketList() {
        return ticketList;
    }

    public void setTicketList(List<Map<String,Object>> ticketList) {
        this.ticketList = ticketList;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                ", password='" + password + '\'' +
                ", uid='" + uid + '\'' +
                ", gender=" + gender +
                ", age=" + age +
                ", ticketList=" + ticketList +
                '}';
    }
}
