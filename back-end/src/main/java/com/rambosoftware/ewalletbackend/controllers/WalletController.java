package com.rambosoftware.ewalletbackend.controllers;

import com.rambosoftware.ewalletbackend.entity.Stock;
import com.rambosoftware.ewalletbackend.entity.User;
import com.rambosoftware.ewalletbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.net.URISyntaxException;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class WalletController {

    private UserService userService;

    @Autowired
    public WalletController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> getUser(@PathVariable("email") String email) {
        User user = userService.findUserByName(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(user);
        }
    }

    @PostMapping("/")
    public ResponseEntity<User> create(@RequestBody User user) {

        User checkUser = userService.findUserByName(user.getName());

        if (checkUser == null) {
            Set<Stock> stocks = user.getStocks();

            userService.saveUser(user);
            //stocks.forEach((stock) -> userService.addStock((new Stock(stock, user))));

        } else if (checkUser instanceof User && user.getName().equals(checkUser.getName())) {
            userService.deleteByName(user.getName());

            userService.saveUser(user);

        } else {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(user);
    }

}
