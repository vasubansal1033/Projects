package org.spring_jdbc.dao;

import org.spring_jdbc.entities.Student;

import java.util.List;

public interface StudentDao {
    public int insert(Student student);
    public int update(Student student);
    public int delete(int studentId);
    public Student getStudent(int studentId);
    public List<Student> getAllStudents();
}
