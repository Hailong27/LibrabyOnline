package com.exercise.librarybackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exercise.librarybackend.model.User;
import com.exercise.librarybackend.repository.UserRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@GetMapping
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	@PostMapping
	public User createUser(@RequestBody User user) {
		return userRepository.save(user);
	}
	
//	@GetMapping("{id}")
//	public ResponseEntity<Book> getBookById(@PathVariable 	long id){
//		Book book = bookRepository.findById(id)
//				.orElseThrow(()-> new ResourceNotFoundException("Book not exist with id:" +id));
//		return ResponseEntity.ok(book);
//	}
}
