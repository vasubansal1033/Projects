package com.lifecycle_methods;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test {
    public static void main(String[] args) {
        AbstractApplicationContext context1 = new ClassPathXmlApplicationContext("lifecycle_methods.xml");
        Samosa s1 = (Samosa) context1.getBean("samosa1");
        System.out.println(s1);

        context1.registerShutdownHook();

        System.out.println("____________________");

        // implementing lifecycle methods using interfaces
        Pepsi p1 = (Pepsi) context1.getBean("pepsi1");
        System.out.println(p1);

        System.out.println("____________________");

        Example example1 = (Example) context1.getBean("eg1");
        System.out.println(example1);

        System.out.println("____________________");

    }
}
