package com.rambosoftware.ewalletbackend.services;

import com.rambosoftware.ewalletbackend.entity.Stock;
import com.rambosoftware.ewalletbackend.entity.User;

public interface UserService {

    User findUserByName(String name);

    void saveUser(User user);

    void addStock(Stock stock);

    void deleteByName(String name);
}
