package com.springcore;

import com.constructor_injection.Addition;
import com.constructor_injection.Person;
import com.reference_injection.A;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Main {
    public static void main(String[] args) {
        System.out.println("Before context");
        ApplicationContext context = new ClassPathXmlApplicationContext("setter_injection.xml");
        System.out.println("After context");

        System.out.println("Before initialization");
        Student student1= (Student) context.getBean("student1");
        Student student2 = (Student) context.getBean("student2");
        Student student3 = (Student) context.getBean("student3");
        System.out.println("After initialization");

        System.out.println("___________________");
        System.out.println(student1.toString());
        System.out.println("___________________");
        System.out.println(student2.toString());
        System.out.println("___________________");
        System.out.println(student3.toString());
        System.out.println("___________________");

        ApplicationContext context2 = new ClassPathXmlApplicationContext("injecting_collection_types.xml");
        Employee emp1 = (Employee) context2.getBean("employee1");
        System.out.println(emp1.getName());
        System.out.println(emp1.getPhones());
        System.out.println(emp1.getAddresses());
        System.out.println(emp1.getCourses());
        System.out.println("___________________");

        ApplicationContext context3 = new ClassPathXmlApplicationContext("reference_injection.xml");
        A atemp = (A) context3.getBean("aref");
        System.out.println(atemp.getX());
        System.out.println(atemp.getB().getY());

        System.out.println("___________________");

        ApplicationContext context4 = new ClassPathXmlApplicationContext("constructor_injection.xml");
        System.out.println("___________________");
        Person person1 = (Person) context4.getBean("person1");
        System.out.println(person1);

        System.out.println("___________________");
        Addition addition1 = (Addition) context4.getBean("addition1");
        System.out.println(addition1);

    }
}