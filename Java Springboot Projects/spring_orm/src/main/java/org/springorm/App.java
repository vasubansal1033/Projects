package org.springorm;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springorm.daos.StudentDao;
import org.springorm.entities.Student;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) {
        ApplicationContext context = new ClassPathXmlApplicationContext("config.xml");
        StudentDao studentDao = context.getBean("studentDao", StudentDao.class);

        Integer result = studentDao.insert(new Student(89, "Rohan Sharma", "Delhi"));
        System.out.println(String.format("Id of row inserted: %s", result));
    }
}
