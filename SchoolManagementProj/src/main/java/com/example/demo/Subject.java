package com.example.demo;

public class Subject {
    private String subjectName;
    private String teacher;

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    @Override
    public String toString() {
        return "Subject [subjectName=" + subjectName + ", teacher=" + teacher + "]";
    }
}
