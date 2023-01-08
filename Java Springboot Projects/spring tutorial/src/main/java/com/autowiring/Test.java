package com.autowiring;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test {
    public static void main(String[] args) {
//        ApplicationContext context = new ClassPathXmlApplicationContext("autowiring.xml");
//        ApplicationContext context1 = new ClassPathXmlApplicationContext("autowiring1.xml");
//        ApplicationContext context2 = new ClassPathXmlApplicationContext("autowiring2.xml");
        ApplicationContext context3 = new ClassPathXmlApplicationContext("autowiring_annotation.xml");

//        Employee emp1 = (Employee) context.getBean("employee1");
//        Employee emp1 = context.getBean("employee1", Employee.class);
//        Employee emp2 = context1.getBean("employee2", Employee.class);
//        Employee emp3 = context2.getBean("employee3", Employee.class);
        Employee emp4 = context3.getBean("employee4", Employee.class);

//        System.out.println(emp1);
//        System.out.println(emp2);
//        System.out.println(emp3);
        System.out.println(emp4);
    }
}
