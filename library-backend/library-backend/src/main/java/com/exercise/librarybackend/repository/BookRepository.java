package com.exercise.librarybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exercise.librarybackend.model.Book;

public interface BookRepository extends JpaRepository<Book, Long>{

}
