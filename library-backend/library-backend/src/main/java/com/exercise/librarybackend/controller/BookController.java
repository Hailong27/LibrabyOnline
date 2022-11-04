package com.exercise.librarybackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exercise.librarybackend.exception.ResourceNotFoundException;
import com.exercise.librarybackend.model.Book;
import com.exercise.librarybackend.repository.BookRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/books")
public class BookController {

	
	@Autowired
	private BookRepository bookRepository;
	
	@GetMapping
	public List<Book> getAllBooks(){
		return bookRepository.findAll();
	}
	
	@PostMapping
	public Book createBook(@RequestBody Book book) {
		return bookRepository.save(book);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Book> getBookById(@PathVariable 	long id){
		Book book = bookRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Book not exist with id:" +id));
		return ResponseEntity.ok(book);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Book> updateBook(@PathVariable long id, @RequestBody Book bookDetails){
		Book updateBook = bookRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Book not exist with id:" +id));
		
		updateBook.setTitle(bookDetails.getTitle());
		updateBook.setAuthor(bookDetails.getAuthor());
		updateBook.setCategory(bookDetails.getCategory());
		updateBook.setReleaseDate(bookDetails.getReleaseDate());
		updateBook.setPageNumber(bookDetails.getPageNumber());
		updateBook.setImage(bookDetails.getImage());
		
		bookRepository.save(updateBook);
		
		return ResponseEntity.ok(updateBook);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<HttpStatus> deleteBook(@PathVariable long id){
		Book book = bookRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Book not exist with id:" +id));
		
		bookRepository.delete(book);
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
