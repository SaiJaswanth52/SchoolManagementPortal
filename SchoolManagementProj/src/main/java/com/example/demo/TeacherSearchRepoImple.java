package com.example.demo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Repository;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@Repository
public class TeacherSearchRepoImple implements TeacherSearch {

    @Autowired
    private MongoClient mongoClient;

    @Autowired
    private MongoConverter converter;

    @Override
    public List<FetchTeachersData> searchInput(String text) {
        List<FetchTeachersData> output = new ArrayList<>();
        
        try {
            MongoDatabase database = mongoClient.getDatabase("School");
            MongoCollection<Document> collection = database.getCollection("Teachers");
            
            AggregateIterable<Document> result = collection.aggregate(Arrays.asList(
                new Document("$search", 
                    new Document("index", "default")
                    .append("compound", 
                        new Document("should", Arrays.asList(
                            new Document("text", 
                                new Document("query", text)
                                .append("path", "FirstName")), 
                            new Document("text", 
                                new Document("query", text)
                                .append("path", "Teaches"))
                        ))
                    )
                )
            ));
            
            result.forEach(docs -> output.add(converter.read(FetchTeachersData.class, docs)));
            
        } catch (Exception e) {
            System.out.print("error is " + e);
        }
        return output;
    }

	
}
