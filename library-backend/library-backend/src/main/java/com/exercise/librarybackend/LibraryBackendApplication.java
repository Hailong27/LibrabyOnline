package com.exercise.librarybackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.exercise.librarybackend.model.Book;
import com.exercise.librarybackend.model.User;
import com.exercise.librarybackend.repository.BookRepository;
import com.exercise.librarybackend.repository.UserRepository;

@SpringBootApplication
public class LibraryBackendApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(LibraryBackendApplication.class, args);
	}

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		User user = new User();
		user.setName("long");
		user.setEmail("long@gmail.com");
		user.setPassword("abc@123");
		userRepository.save(user);
	}

}
