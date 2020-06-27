package com.rambosoftware.ewalletbackend.services;

import com.rambosoftware.ewalletbackend.entity.Stock;
import com.rambosoftware.ewalletbackend.entity.User;
import com.rambosoftware.ewalletbackend.repositories.StockRepository;
import com.rambosoftware.ewalletbackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private StockRepository stockRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, StockRepository stockRepository) {
        this.userRepository = userRepository;
        this.stockRepository = stockRepository;
    }


    @Override
    public User findUserByName(String name) {
        User user = userRepository.findByName(name);
        return user;
    }

    @Override
    public void saveUser(User user){
        userRepository.save(user);
    }

    @Override
    public void addStock(Stock stock) {
    stockRepository.save(stock);
    }

    @Override
    public void deleteByName(String name) {
        userRepository.deleteByName(name);
    }
}
