package com.example.userauthentication.controller;

import com.example.userauthentication.entity.ContactUs;
import com.example.userauthentication.entity.User;
import com.example.userauthentication.exceptions.InvalidCredentialException;
import com.example.userauthentication.exceptions.UserAlreadyExistException;
import com.example.userauthentication.security.SecurityTokenGenerator;
import com.example.userauthentication.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200/")
public class UserController {
    private final SecurityTokenGenerator securityTokenGenerator;
    private final UserServiceImpl userService;
    @Autowired
    public UserController(SecurityTokenGenerator securityTokenGenerator, UserServiceImpl userService) {
        this.securityTokenGenerator = securityTokenGenerator;
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) throws UserAlreadyExistException {
        return new ResponseEntity<>(userService.signUp(user),HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) throws InvalidCredentialException {
        User userFromDb=userService.login(user);
        System.out.println("user from db"+ userFromDb);
    return new ResponseEntity<>(securityTokenGenerator.generateToken(userFromDb),HttpStatus.OK);
 }

    @PostMapping("/contact-us")
    public ResponseEntity<?> sendContactUsEmail(@RequestBody ContactUs form){
        try{
            // Create a new JavaMail session
            Properties properties = new Properties();
            properties.put("mail.smtp.auth", "true");
            properties.put("mail.smtp.starttls.enable", "true");
            properties.put("mail.smtp.host", "smtp.gmail.com");
            properties.put("mail.smtp.port", "587");

            Session session = Session.getInstance(properties, new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication("taransaini143@gmail.com", "hsvsqovcseaqaqme");
                }
            });

            // Create a new email message
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress());
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(form.getEmail()));
            message.setSubject("Contact Us Email");

            message.setText("Hi " + form.getName() + "\n \n Thanks for reach out to us, we glad you subscribed to us. We have something big soon. We will update you with all our latest upcoming movies");

            // Send the email
            Transport.send(message);

            // Return the response
            return ResponseEntity.ok().build();

        }catch(Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }


}
