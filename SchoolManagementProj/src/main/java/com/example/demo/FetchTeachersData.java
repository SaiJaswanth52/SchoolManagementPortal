package com.example.demo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Teachers")
public class FetchTeachersData {

    @Id
    private String _id;

    @Field(value = "TeacherId", order = 1)
    private int teacherId;

    @Field(value = "FirstName", order = 2)
    private String firstName;

    @Field(value = "LastName", order = 3)
    private String lastName;

    @Field(value = "Teaches", order = 4)
    private String teaches;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public int getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(int teacherId) {
        this.teacherId = teacherId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getTeaches() {
        return teaches;
    }

    public void setTeaches(String teaches) {
        this.teaches = teaches;
    }

    @Override
    public String toString() {
        return "FetchTeachersData [teacherId=" + teacherId + ", firstName=" + firstName + ", lastName=" + lastName + ", teaches=" + teaches + "]";
    }

    public FetchTeachersData() {
        super();
    }
}
