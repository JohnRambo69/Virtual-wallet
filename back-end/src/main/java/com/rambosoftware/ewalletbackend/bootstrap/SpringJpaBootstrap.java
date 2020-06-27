package com.rambosoftware.ewalletbackend.bootstrap;

import com.rambosoftware.ewalletbackend.entity.Stock;
import com.rambosoftware.ewalletbackend.entity.User;
import com.rambosoftware.ewalletbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class SpringJpaBootstrap implements ApplicationListener<ContextRefreshedEvent> {

    private UserService userService;

    @Autowired
    public SpringJpaBootstrap(UserService userService) {
        this.userService = userService;
    }


    private void loadExampleUser(){
//        System.out.println("Start working.");
//        User user1 = new User();
//        user1.setName("adam");
//        user1.setBalance(9000.00);
//        user1.setCost(2000.00);
//        System.out.println("Created user.");
//
//
//        userService.saveUser(user1);
//        userService.addStock(new Stock().builder().symbol("HHS").name("Harte-Hanks, Inc.").price(223.84).change(-22.51).cost(223.84).user(user1).build());
//        System.out.println("User saved in database...");


    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        loadExampleUser();
    }
}
