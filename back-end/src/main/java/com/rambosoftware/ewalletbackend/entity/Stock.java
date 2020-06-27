package com.rambosoftware.ewalletbackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
//@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Stock implements Serializable {

//    @Builder
//    public Stock(String symbol, String name, Double price, Double change, Double cost, User user) {
//        this.symbol = symbol;
//        this.name = name;
//        this.price = price;
//        this.change = change;
//        this.cost = cost;
//        this.user = user;
//    }


    @Builder
    public Stock(String symbol, String name, Double price, Double change, Double cost, User user) {
        this.symbol = symbol;
        this.name = name;
        this.price = price;
        this.changes = change;
        this.cost = cost;
        this.user = user;
    }

    public Stock(Stock stock, User user){
        this.name = stock.getName();
        this.price = stock.getPrice();
        this.user = user;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="symbol")
    private String symbol;

    @Column(name="name")
    private String name;

    @Column(name="price")
    private Double price;

    @Column(name="changes")
    private Double changes;

    @Column(name="cost")
    private Double cost;



    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="user_id", nullable = false)
    @JsonBackReference
    private User user;

}
