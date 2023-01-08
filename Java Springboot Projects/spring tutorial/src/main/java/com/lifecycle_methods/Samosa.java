package com.lifecycle_methods;

public class Samosa {
    private double price;

    public Samosa() {
    }

    public Samosa(double price) {
        System.out.println("Samosa.Samosa");
        this.price = price;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        System.out.println("Samosa.setPrice");
        this.price = price;
    }

    @Override
    public String toString() {
        return "Samosa{" +
                "price=" + price +
                '}';
    }

    public void init() {
        System.out.println("Samosa.init");
    }
    public void destroy() {
        System.out.println("Samosa.destroy");
    }
}
