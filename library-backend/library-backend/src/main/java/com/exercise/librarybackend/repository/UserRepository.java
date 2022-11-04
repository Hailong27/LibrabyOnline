package com.exercise.librarybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exercise.librarybackend.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
