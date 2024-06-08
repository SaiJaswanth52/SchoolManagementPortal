package com.example.demo;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Student")
public class FetchData {

    @Id
    private String _id;
    private int studentid;
    private String firstname;
    private String lastname;
    private List<Subject> SubjectsRegistered;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public int getStudentid() {
        return studentid;
    }

    public void setStudentid(int studentid) {
        this.studentid = studentid;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public List<Subject> getSubjectsRegistered() {
        return SubjectsRegistered;
    }

    public void setSubjectsRegistered(List<Subject> SubjectsRegistered) {
        this.SubjectsRegistered = SubjectsRegistered;
    }

    @Override
    public String toString() {
        return "FetchData [studentid=" + studentid + ", firstname=" + firstname + ", lastname=" + lastname + ", SubjectsRegistered=" + SubjectsRegistered + "]";
    }

    public FetchData() {
        super();
    }
}
