package com.rambosoftware.ewalletbackend.repositories;

import com.rambosoftware.ewalletbackend.entity.Stock;
import org.springframework.data.repository.CrudRepository;

public interface StockRepository extends CrudRepository<Stock, Integer> {
}
