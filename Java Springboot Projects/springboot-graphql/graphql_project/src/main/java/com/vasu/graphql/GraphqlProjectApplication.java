package com.vasu.graphql;

import com.vasu.graphql.entities.Author;
import com.vasu.graphql.entities.Book;
import com.vasu.graphql.repositories.AuthorRepository;
import com.vasu.graphql.repositories.BookRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class GraphqlProjectApplication {

	public static void main(String[] args) {
		SpringApplication. run(GraphqlProjectApplication.class, args);
	}

	@Bean
	ApplicationRunner applicationRunner(AuthorRepository authorRepository, BookRepository bookRepository) {
		return args -> {
			Author vasu = authorRepository.save(new Author(
					"Vasu Bansal"
			));

			Author parv = authorRepository.save(new Author(
					"Parv Bansal"
			));

			bookRepository.saveAll(List.of(
					new Book("Book1", "Random book 1", vasu, 50, 100),
					new Book("Book2", "Random book 2", parv, 25, 120),
					new Book("Book3", "Random book 3", vasu, 60, 900)
			));
		};
	}

}
