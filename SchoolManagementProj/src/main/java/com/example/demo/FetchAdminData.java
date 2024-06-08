package com.example.demo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Admin")
public class FetchAdminData {

    @Id
    private String id;
    private String Username;
    private String Password;

    // Constructors
    public FetchAdminData() {
    }

    public FetchAdminData(String Username, String Password) {
        this.Username = Username;
        this.Password = Password;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        this.Username = username;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        this.Password = password;
    }

    @Override
    public String toString() {
        return "FetchAdminData [id=" + id + ", Username=" + Username + ", Password=" + Password + "]";
    }
}
