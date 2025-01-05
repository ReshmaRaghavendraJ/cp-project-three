package com.example.election.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Random;

@Entity
@Getter
@Setter

public class Aadharcardholder
{
    @Id
    private String aadharcardno;
    private String name;
    private int age;
    private String address;
    private String mobileno;

    public Aadharcardholder()
    {

    }

    public Aadharcardholder(String aadharcardno, String name, int age, String address, String mobileno) {
        this.aadharcardno = aadharcardno;
        this.name = name;
        this.age = age;
        this.address = address;
        this.mobileno = mobileno;
    }

    // Method to generate random 12-digit Aadhar card number
    public static String generateRandomAadharCardNo() {
        Random random = new Random();
        StringBuilder aadharCardNo = new StringBuilder();

        // Generate 12 random digits
        for (int i = 0; i < 12; i++) {
            aadharCardNo.append(random.nextInt(10)); // appending random digits (0 to 9)
        }

        // Format the number with spaces after every 4 digits
        return formatAadharCardNo(aadharCardNo.toString());
    }

    // Method to format the Aadhar card number by adding spaces after every 4 digits
    private static String formatAadharCardNo(String aadharCardNo) {
        StringBuilder formattedAadharNo = new StringBuilder();
        for (int i = 0; i < aadharCardNo.length(); i++) {
            if (i > 0 && i % 4 == 0) {
                formattedAadharNo.append(" ");
            }
            formattedAadharNo.append(aadharCardNo.charAt(i));
        }
        return formattedAadharNo.toString();
    }

    public String getAadharcardno() {
        return aadharcardno;
    }

    public void setAadharcardno(String aadharcardno) {
        this.aadharcardno = aadharcardno;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMobileno() {
        return mobileno;
    }

    public void setMobileno(String mobileno) {
        this.mobileno = mobileno;
    }
}
