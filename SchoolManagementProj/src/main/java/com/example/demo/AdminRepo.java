package com.example.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepo extends MongoRepository<FetchAdminData, String> {
}
