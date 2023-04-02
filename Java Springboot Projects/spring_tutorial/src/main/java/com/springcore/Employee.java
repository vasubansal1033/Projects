package com.springcore;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class Employee {
    private String name;
    List<String> phones;
    Set<String> addresses;
    private Map<String, String> courses;

    public Employee() {
    }

    public Employee(String name, List<String> phones, Set<String> addresses, Map<String, String> courses) {
        this.name = name;
        this.phones = phones;
        this.addresses = addresses;
        this.courses = courses;
    }

    public String getName() {
        return name;
    }

    public List<String> getPhones() {
        return phones;
    }

    public Set<String> getAddresses() {
        return addresses;
    }

    public Map<String, String> getCourses() {
        return courses;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhones(List<String> phones) {
        this.phones = phones;
    }

    public void setAddresses(Set<String> addresses) {
        this.addresses = addresses;
    }

    public void setCourses(Map<String, String> courses) {
        this.courses = courses;
    }

    @Override
    public String toString() {
        return String.format("Employee{" +
                "name='" + name + '\'' +
                ", phones=" + phones +
                ", addresses=" + addresses +
                ", courses=" + courses +
                '}'
        );
    }
}
