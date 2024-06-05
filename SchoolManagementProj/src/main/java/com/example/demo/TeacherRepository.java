package com.example.demo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends MongoRepository<FetchTeachersData, String> {

	Optional<FetchTeachersData> findByTeacherId(int teacherId);

	
	Optional<FetchTeachersData> findBy_id(String _id);


	void save(FetchData existingStudent);


	
	
}
