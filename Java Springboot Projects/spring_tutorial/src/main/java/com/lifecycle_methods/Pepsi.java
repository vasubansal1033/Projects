package com.lifecycle_methods;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;

public class Pepsi implements InitializingBean, DisposableBean {
    private int price;

    public Pepsi() {
    }

    public Pepsi(int price) {
        this.price = price;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Pepsi{" +
                "price=" + price +
                '}';
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        // init method
        System.out.println("Pepsi.afterPropertiesSet");
    }

    @Override
    public void destroy() throws Exception {
        System.out.println("Pepsi.destroy");
    }
}
