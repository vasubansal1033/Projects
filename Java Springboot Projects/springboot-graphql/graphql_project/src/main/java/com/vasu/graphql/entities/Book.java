package com.vasu.graphql.entities;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "project_books")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String description;
    @ManyToOne(fetch = FetchType.LAZY)
    private Author author;
    private double price;
    private int pages;

    public Book(String title, String description, Author author, double price, int pages) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.price = price;
        this.pages = pages;
    }

}
