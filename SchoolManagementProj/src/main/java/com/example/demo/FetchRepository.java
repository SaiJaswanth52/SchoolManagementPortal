package com.example.demo;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FetchRepository extends MongoRepository<FetchData, String> {

	
	Optional<FetchData> findById(String _id);

	

	Optional<FetchData> findByStudentid(int studentId);
}
