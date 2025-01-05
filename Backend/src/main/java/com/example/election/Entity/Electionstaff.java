package com.example.election.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class Electionstaff
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int electionstaffid;
    private String name;
    private String designation;
    private String mobileno;
    private String address;
    private String password;

    public Electionstaff()
    {

    }

    public Electionstaff(int electionstaffid, String name, String designation, String mobileno, String address, String password, Constituency constituency3) {
        this.electionstaffid = electionstaffid;
        this.name = name;
        this.designation = designation;
        this.mobileno = mobileno;
        this.address = address;
        this.password = password;
        this.constituency3 = constituency3;
    }

    public int getElectionstaffid() {
        return electionstaffid;
    }

    public void setElectionstaffid(int electionstaffid) {
        this.electionstaffid = electionstaffid;
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

    public Constituency getConstituency3() {
        return constituency3;
    }

    public void setConstituency3(Constituency constituency3) {
        this.constituency3 = constituency3;
    }

    @OneToOne
    @JoinColumn(name="constituencyid")
    private Constituency constituency3;

}
