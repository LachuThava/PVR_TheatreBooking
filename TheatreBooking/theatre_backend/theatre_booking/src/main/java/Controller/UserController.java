package Controller;

import Entity.User;
import Service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
@CrossOrigin("*")
@RestController
public class UserController {

    public UserService userService;



    @Autowired
    public  UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(path = "/createUser",method = RequestMethod.POST)
    public String addUser(@RequestBody User user) throws ExecutionException, InterruptedException, FirebaseAuthException, JsonProcessingException {
        return userService.addUser(user);
    }


    @RequestMapping(path = "/users",method = RequestMethod.GET)
    public ArrayList<User> getUsers() throws ExecutionException, InterruptedException {
        return userService.getAllUsers();
    }

    @RequestMapping(path = "/user/{uid}",method = RequestMethod.GET)
    public User getUser(@PathVariable(name = "uid") String uid) throws ExecutionException, InterruptedException {
        return userService.getUser(uid);
    }
    @RequestMapping(path = "/editUser",method = RequestMethod.PUT)
    public User updateUser(@RequestBody User user) throws ExecutionException, InterruptedException {
        return userService.updateUser(user);
    }

    @RequestMapping(path = "/deleteUser/{uid}",method = RequestMethod.DELETE)
    public String deleteUser(@PathVariable String uid) throws ExecutionException, InterruptedException, FirebaseAuthException {
        return userService.deleteUser(uid);
    }



}
