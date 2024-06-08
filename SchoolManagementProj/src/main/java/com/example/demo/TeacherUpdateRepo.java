package com.example.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TeacherUpdateRepo extends MongoRepository<FetchTeachersData, Integer> {
  

	Optional<FetchTeachersData> findByTeacherId(int teacherId);
}
