package org.spring_jdbc;

import org.spring_jdbc.dao.StudentDao;
import org.spring_jdbc.entities.Student;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        System.out.println("Program started -------");
        ApplicationContext context = new ClassPathXmlApplicationContext("jdbc_config.xml");

        StudentDao studentDao = (StudentDao) context.getBean("studentDao");
//        studentDao.insert(new Student(69, "Bonda", "Himachal"));
//        studentDao.update(new Student(69, "Ashmita", "Malout"));
//        studentDao.delete(8);
//        System.out.println(studentDao.getStudent(69));
//        System.out.println(studentDao.getAllStudents());
        List<Student> students = studentDao.getAllStudents();
        for(Student s: students) {
            System.out.println(s);
        }
    }
}