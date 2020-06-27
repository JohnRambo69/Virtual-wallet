package com.rambosoftware.ewalletbackend.repositories;

import com.rambosoftware.ewalletbackend.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    User findByName(String name);

    void deleteByName(String name);
}
