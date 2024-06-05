package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private FetchRepository repo;

    @Autowired
    private SearchRepository srepo;

    @Autowired
    private StudentUpdateRepo surepo;

    @Autowired
    private TeacherRepository trepo;

    @Autowired
    private TeacherSearch tsrepo;
    
    @Autowired
    private AdminRepo arepo;
    

    @GetMapping("/Student")
    public List<FetchData> getAllStudents() {
        return repo.findAll();
    }

    @GetMapping("/Teachers")
    public List<FetchTeachersData> getAllTeachers() {
        return trepo.findAll();
    }

    @GetMapping("/Student/search/{text}")
    public List<FetchData> searchText(@PathVariable String text) {
        return srepo.searchInput(text);
    }

    @GetMapping("/Teachers/search/{text}")
    public List<FetchTeachersData> searchData(@PathVariable String text) {
        return tsrepo.searchInput(text);
    }

    @PutMapping("/Student/{_id}")
    public void updateStudent(@PathVariable String _id, @RequestBody FetchData studentData) {
        System.out.println("Received update request for student ID: " + _id);
        System.out.println("Updated student data: " + studentData.toString());

        Optional<FetchData> existingStudentOpt = repo.findById(_id);
        System.out.println(existingStudentOpt);

        if (existingStudentOpt.isPresent()) {
            FetchData existingStudent = existingStudentOpt.get();
            System.out.println("Found existing student: " + existingStudent.toString());
            existingStudent.setFirstname(studentData.getFirstname());
            existingStudent.setLastname(studentData.getLastname());
            existingStudent.setSubjectsRegistered(studentData.getSubjectsRegistered());

            surepo.save(existingStudent);
            System.out.println("Student record updated successfully");
        } else {
            System.out.println("Student not found with ID: " + _id);
        }
    }

    @DeleteMapping("/Student/{_id}")
    public void deleteStudent(@PathVariable String _id) {
        System.out.println("Received delete request for student ID: " + _id);

        Optional<FetchData> existingStudentOpt = repo.findById(_id);
        System.out.println(existingStudentOpt);

        if (existingStudentOpt.isPresent()) {
            repo.delete(existingStudentOpt.get());
            System.out.println("Student deleted successfully");
        } else {
            System.out.println("Student not found with ID: " + _id);
        }
    }

    @PutMapping("/Teachers/{_id}")
    public void updateTeacher(@PathVariable String _id, @RequestBody FetchTeachersData teacherData) {
        System.out.println("Received update request for teacher ID: " + _id);
        System.out.println("Updated teacher data: " + teacherData.toString());

        Optional<FetchTeachersData> existingTeacherOpt = trepo.findById(_id);
        
        System.out.println("Before updating" + existingTeacherOpt +" ");
     
        if (existingTeacherOpt.isPresent()) {
            FetchTeachersData existingTeacher = existingTeacherOpt.get();
            System.out.println("Found existing teacher: " + existingTeacher.toString());
            existingTeacher.setFirstName(teacherData.getFirstName());
            existingTeacher.setLastName(teacherData.getLastName());
            existingTeacher.setTeaches(teacherData.getTeaches());

            trepo.save(existingTeacher);
            System.out.println("Teacher record updated successfully");
        } else {
            System.out.println("Teacher not found with ID: " + _id);
        }
    }

    @DeleteMapping("/Teachers/{_id}")
    public void deleteTeacher(@PathVariable String _id) {
        Optional<FetchTeachersData> existingTeacherOpt = trepo.findById(_id);
        if (existingTeacherOpt.isPresent()) {
            trepo.delete(existingTeacherOpt.get());
            System.out.println("Teacher deleted successfully");
        } else {
            System.out.println("Teacher not found with ID: " + _id);
        }
    }

    // New endpoints for inserting student and teacher data
    @PostMapping("/Student")
    public FetchData createStudent(@RequestBody FetchData studentData) {
        return repo.save(studentData);
    }

    @PostMapping("/Teachers")
    public FetchTeachersData createTeacher(@RequestBody FetchTeachersData teacherData) {
        return trepo.save(teacherData);
    }

    @GetMapping("/Student/{studentId}")
    public Optional<FetchData> getStudentById(@PathVariable int studentId) {
        return repo.findByStudentid(studentId);
    }

    @GetMapping("/Teachers/{teacherId}")
    public Optional<FetchTeachersData> getTeacherById(@PathVariable int teacherId) {
        return trepo.findByTeacherId(teacherId);
    }
    
    @GetMapping("/Admin")
    public List<FetchAdminData> getAdmin() {
        return arepo.findAll();
}

}