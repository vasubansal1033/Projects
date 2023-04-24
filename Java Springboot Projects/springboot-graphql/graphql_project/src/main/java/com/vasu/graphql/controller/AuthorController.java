package com.vasu.graphql.controller;

import com.vasu.graphql.dto.BookInput;
import com.vasu.graphql.entities.Author;
import com.vasu.graphql.entities.Book;
import com.vasu.graphql.repositories.AuthorRepository;
import com.vasu.graphql.repositories.BookRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.Optional;

@Controller
@AllArgsConstructor
@NoArgsConstructor
public class AuthorController {
    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookRepository bookRepository;

    @QueryMapping
    Iterable<Author> authors() {
        return authorRepository.findAll();
    }

    @QueryMapping
    Optional<Author> authorById(@Argument int id) {
        return authorRepository.findById(id);
    }

    @MutationMapping
    Book addBook(@Argument BookInput book) {
        Author author = authorRepository.findById(book.getAuthorId())
                .orElseThrow(() -> new IllegalArgumentException("Author not found"));
        Book b =  new Book(
                book.getTitle(),
                book.getDescription(),
                author,
                book.getPrice(),
                book.getPages()
        );
        return bookRepository.save(b);
    }
}
