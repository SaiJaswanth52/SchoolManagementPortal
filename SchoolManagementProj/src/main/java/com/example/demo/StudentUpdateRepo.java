package com.example.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface StudentUpdateRepo extends MongoRepository<FetchData, String> {

	Optional<FetchData> findByStudentid(int studentid);

	

	void delete(FetchData fetchData);
	 
}
