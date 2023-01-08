package com.constructor_injection;

public class Addition {
    private int a;
    private int b;

    public Addition() {
    }

    public Addition(double a, double b) {
        this.a = (int) a;
        this.b = (int) b;
        System.out.println("a = " + a + ", b = " + b);
        System.out.println("double:double");
    }

    public Addition(int a, int b) {
        this.a = a;
        this.b = b;
        System.out.println("a = " + a + ", b = " + b);
        System.out.println("int:int");
    }

    public Addition(String a, String b) {
        this.a = Integer.parseInt(a);
        this.b = Integer.parseInt(b);
        System.out.println("a = " + a + ", b = " + b);
        System.out.println("string:string");
    }
    public int getA() {
        return a;
    }

    public void setA(int a) {
        this.a = a;
    }

    public int getB() {
        return b;
    }

    public void setB(int b) {
        this.b = b;
    }

    @Override
    public String toString() {
        return "Addition{" +
                "a=" + a +
                ", b=" + b +
                '}';
    }
}
