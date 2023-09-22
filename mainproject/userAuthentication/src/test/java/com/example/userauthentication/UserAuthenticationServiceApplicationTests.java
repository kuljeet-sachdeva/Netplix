package com.example.userauthentication;
import com.example.userauthentication.entity.User;
import com.example.userauthentication.exceptions.InvalidCredentialException;
import com.example.userauthentication.proxy.UserProxy;
import com.example.userauthentication.repository.UserRepository;
import com.example.userauthentication.service.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
class UserAuthenticationServiceApplicationTests {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserProxy userProxy;
    @Autowired
    private UserServiceImpl userServiceImpl;

    @BeforeEach
    public void setup(){
        userServiceImpl = new UserServiceImpl(userRepository,userProxy);
    }

    @Test
    public void testValidLogin() throws InvalidCredentialException {
        String email = "test@gmail.com";
        String password = "123456789";
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        User result = userServiceImpl.login(user);
        assertNotNull(result, "Valid login should return a non-null User");
        assertEquals(email, result.getEmail(), "Email should match");
        assertNotEquals("bbbbb@gmai.com",result.getEmail(),"Email should not be matched");
    }

    @Test
    public void testInvalidLogin() throws InvalidCredentialException {
        String email = "test@gmail.com";
        String incorrectPassword = "incorrect_password";
        User user = new User();
        user.setEmail(email);
        user.setPassword(incorrectPassword);
        User result = userServiceImpl.login(user);
        assertNull(result, "Invalid login should return null or an indicator of failure");
        user.setPassword("123456789");
        User result1 = userServiceImpl.login(user);
        assertNotNull(result1,"Valid login should return true");
    }
    
    @Test
    public void testValidRegistration() throws Exception {
        String email = "test@gmail.com";
        String password = "123456789";
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        User result = userServiceImpl.signUp(user);
        assertNotNull(result, "Valid registration should return a non-null User");
        assertEquals(email, result.getEmail(), "Email should match");
    }

    @Test
    public void testDuplicateRegistration() throws Exception {
        String email = "test@gmail.com";
        String password = "123456789";
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        User firstRegistrationResult = userServiceImpl.signUp(user);
        User secondRegistrationResult = userServiceImpl.signUp(user);
        assertNull(secondRegistrationResult, "Duplicate registration should return null");
        assertNotNull(firstRegistrationResult, "First registration should return a non-null User");
    }
    }
