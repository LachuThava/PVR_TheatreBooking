package com.example.theatre_booking;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.io.FileInputStream;
import java.io.IOException;

@SpringBootApplication
@ComponentScan(basePackages = {"Controller","Service","Entity"})
public class TheatreBookingApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(TheatreBookingApplication.class, args);

		FileInputStream serviceAccount =
				new FileInputStream("src/main/java/com/example/theatre_booking/serviceAccountKey.json");

		FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.build();

		FirebaseApp.initializeApp(options);



	}

}
