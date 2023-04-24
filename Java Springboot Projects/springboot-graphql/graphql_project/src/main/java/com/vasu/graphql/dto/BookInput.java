package com.vasu.graphql.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookInput {
    private String title;
    private String description;
    private int authorId;
    private double price;
    private int pages;

    public BookInput() {}

    public BookInput(String title, String description, int authorId, double price, int pages) {
        this.title = title;
        this.description = description;
        this.authorId = authorId;
        this.price = price;
        this.pages = pages;
    }

}
