package Service;

import Entity.User;
import Resources.Gender;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserInfo;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;


@Service
public class UserService {


    public String addUser(User user) throws ExecutionException, InterruptedException, FirebaseAuthException, JsonProcessingException {
        Firestore DB = FirestoreClient.getFirestore();
        FirebaseAuth auth = FirebaseAuth.getInstance();


//        add to FirebaseAuth list
        UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest();
        createRequest.setEmail(user.getEmail());
        createRequest.setPassword(user.getPassword());
        UserRecord userRecord = auth.createUser(createRequest);
        user.setUid(userRecord.getUid());



        Map<String, Object> userData = new HashMap<>();
        userData.put("name", user.getName());
        userData.put("uid", user.getUid());
        userData.put("email", user.getEmail());
        userData.put("age",user.getAge());
        userData.put("role",user.getRole());
        userData.put("gender", String.valueOf(user.getGender()));
        userData.put("ticketList",user.getTicketList());
        System.out.println("userData : "+userData);

//        add Firestore
        ApiFuture<WriteResult> collectionApiFuture = DB.collection("users").document(user.getUid()).set(userData);

        return collectionApiFuture.get().getUpdateTime().toString();
    }



    public ArrayList<User> getAllUsers() throws ExecutionException, InterruptedException {
        Firestore DB = FirestoreClient.getFirestore();

        List<QueryDocumentSnapshot> uids =  DB.collection("users").get().get().getDocuments();
        ArrayList<User> users = new ArrayList<>();
        uids.forEach((snapshot)->{
            Map<String,Object> map = snapshot.getData();
            System.out.println(map);
            String name = (String) map.get("name");
            String email = (String) map.get("email");
            String uid = (String) map.get("uid");
            String role = (String) map.get("role");
            Long age = (Long) map.get("age");
            String gender = (String) map.get("gender");
            List<Map<String,Object>> list = (List<Map<String, Object>>) map.get("ticketList");
            User user = new User(name,email,uid,role,Gender.valueOf(gender),age.intValue(),list);
            users.add(user);
        });

         return users;
    }


    public User getUser(String uid) throws ExecutionException,InterruptedException{
        Firestore DB = FirestoreClient.getFirestore();

        List<QueryDocumentSnapshot> uids = DB.collection("users").get().get().getDocuments();

        User user = new User();

        uids.forEach((snapshot)->{
            Map<String,Object> map = snapshot.getData();
           if(map.get("uid").equals(uid)){
               System.out.println(map);
               user.setName((String) map.get("name"));
               user.setUid((String) map.get("uid"));
               user.setEmail((String) map.get("email"));
               user.setRole((String)map.get("role"));
               user.setGender(Gender.valueOf((String) map.get("gender")));
               user.setTicketList((List<Map<String, Object>>) map.get("ticketList"));

               Long age = (Long) map.get("age");
               user.setAge(age.intValue());

           }
        });

        return user;
    }


    public User updateUser(User updateUser) throws ExecutionException, InterruptedException {
        Firestore DB = FirestoreClient.getFirestore();
        List<QueryDocumentSnapshot> uids = DB.collection("users").get().get().getDocuments();
        uids.forEach((data)->{
            Map<String,Object> dataDoc= data.getData();
            if(dataDoc.get("uid").equals(updateUser.getUid())){
                dataDoc.replace("name",updateUser.getName());
                dataDoc.replace("email",updateUser.getEmail());
                dataDoc.replace("age",updateUser.getAge());
                dataDoc.replace("ticketList",updateUser.getTicketList());
                dataDoc.replace("gender",updateUser.getGender());
                System.out.println(dataDoc);
                DB.collection("users").document(updateUser.getUid()).set(dataDoc);
            }
        });
        return updateUser;
    }

    public String deleteUser(String uid) throws ExecutionException, InterruptedException, FirebaseAuthException {
        Firestore DB = FirestoreClient.getFirestore();
        FirebaseAuth auth = FirebaseAuth.getInstance();
        auth.deleteUser(uid);
        ApiFuture<WriteResult> writeResult = DB.collection("users").document(uid).delete();

        return writeResult.get().getUpdateTime().toString();
    }




}
