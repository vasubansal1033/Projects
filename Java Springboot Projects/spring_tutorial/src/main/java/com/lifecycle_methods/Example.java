package com.lifecycle_methods;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

public class Example {
    private String subject;

    public Example() {
    }

    public Example(String subject) {
        this.subject = subject;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    @Override
    public String toString() {
        return "Example{" + "subject='" + subject + '\'' + '}';
    }

    @PostConstruct
    public void init() {
        System.out.println("Example.init");
    }

    @PreDestroy
    public void destroy() {
        System.out.println("Example.destroy");
    }
}
