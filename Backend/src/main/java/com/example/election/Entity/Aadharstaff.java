package com.example.election.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class Aadharstaff
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer aadharstaffid;
    private String name;
    private String designation;
    private String mobileno;
    private String address;
    private String password;

    public Aadharstaff( ) {

    }

    public Aadharstaff(Integer aadharstaffid, String name, String designation, String mobileno, String address, String password) {
        this.aadharstaffid = aadharstaffid;
        this.name = name;
        this.designation = designation;
        this.mobileno = mobileno;
        this.address = address;
        this.password = password;
    }

    public Integer getAadharstaffid() {
        return aadharstaffid;
    }

    public void setAadharstaffid(Integer aadharstaffid) {
        this.aadharstaffid = aadharstaffid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getMobileno() {
        return mobileno;
    }

    public void setMobileno(String mobileno) {
        this.mobileno = mobileno;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
