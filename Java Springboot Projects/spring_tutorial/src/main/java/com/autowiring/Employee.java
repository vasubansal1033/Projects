package com.autowiring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public class Employee {
    public String name;

//    @Autowired
    public Address address;
    public Employee() {
    }

//    @Autowired
    public Employee(Address address) {
        System.out.println("Employee.Employee");
        this.name = "Constructor Injection";
        this.address = address;
    }

    public Employee(String name, Address address) {
        this.name = name;
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Address getAddress() {
        return address;
    }

    // Use qualifier notation to specify which bean name to be passed
    // incase of multiple beans
    @Autowired
    @Qualifier("address_random_name_2")
    public void setAddress(Address address) {
        System.out.println("Employee.setAddress");
        this.address = address;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", address=" + address +
                '}';
    }
}
