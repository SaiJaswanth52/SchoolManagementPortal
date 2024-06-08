package com.example.demo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Controller;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@Controller
public class SearchRepoImplement implements SearchRepository {
    @Autowired
    MongoClient mongoClient;

    @Autowired
    MongoConverter convert;

    @Override
    public List<FetchData> searchInput(String text) {
        List<FetchData> output = new ArrayList<>();

        try {
            MongoDatabase database = mongoClient.getDatabase("School");
            MongoCollection<Document> collection = database.getCollection("Student");

            AggregateIterable<Document> result = collection.aggregate(Arrays.asList(
                new Document("$search", 
                    new Document("index", "default")
                        .append("text", new Document("query", text)
                        .append("path", Arrays.asList("SubjectsRegistered.subjectName", "firstname")))),
                new Document("$sort", new Document("Studentid", 1L))
            ));

            result.forEach(docs -> output.add(convert.read(FetchData.class, docs)));
        } catch (Exception e) {
            System.out.print("error is: " + e);
        }

        return output;
    }
}
