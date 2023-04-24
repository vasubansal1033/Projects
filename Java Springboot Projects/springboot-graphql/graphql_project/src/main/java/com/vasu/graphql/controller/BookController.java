package com.vasu.graphql.controller;

import com.vasu.graphql.dto.BookInput;
import com.vasu.graphql.entities.Book;
import com.vasu.graphql.repositories.AuthorRepository;
import com.vasu.graphql.repositories.BookRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.Optional;

@Controller
@AllArgsConstructor
@NoArgsConstructor
public class BookController {

    @Autowired
    BookRepository bookRepository;

    @QueryMapping
    Iterable<Book> books() {
        return bookRepository.findAll();
    }

    @QueryMapping
    Optional<Book> bookById(@Argument int id) {
        return bookRepository.findById(id);
    }
}
