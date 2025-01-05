package com.example.election.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Random;

@Entity
@Getter
@Setter
public class Voterregister {
    @Id
    private String voterid;
    private String name;
    private String adharno;
    private int age;
    private String address;
    private String mobileno;
    private String password;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String filepath;

    public Voterregister()
    {
        // Generate the voterid when a new Voterregister object is created
        this.voterid = generateVoterId();
    }

    public Voterregister(String voterid, String name, String adharno, int age, String address, String mobileno, String password, String filepath, Constituency constituency, List<Castvote> castvotes) {
        this.voterid = voterid;
        this.name = name;
        this.adharno = adharno;
        this.age = age;
        this.address = address;
        this.mobileno = mobileno;
        this.password = password;
        this.filepath = filepath;
        this.constituency = constituency;
        this.castvotes = castvotes;
    }

    // Method to generate the random voterid
    private String generateVoterId() {
        Random random = new Random();

        // Generate first 3 capital letters
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 3; i++) {
            char letter = (char) ('A' + random.nextInt(26)); // A to Z
            sb.append(letter);
        }

        // Generate 7 random digits
        for (int i = 0; i < 7; i++) {
            sb.append(random.nextInt(10)); // 0 to 9
        }

        return sb.toString();
    }


    public String getVoterid() {
        return voterid;
    }

    public void setVoterid(String voterid) {
        this.voterid = voterid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAdharno() {
        return adharno;
    }

    public void setAdharno(String adharno) {
        this.adharno = adharno;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public Constituency getConstituency() {
        return constituency;
    }

    public void setConstituency(Constituency constituency) {
        this.constituency = constituency;
    }

    public List<Castvote> getCastvotes() {
        return castvotes;
    }

    public void setCastvotes(List<Castvote> castvotes) {
        this.castvotes = castvotes;
    }

    @ManyToOne
    @JoinColumn(name="constituencyid")
    private Constituency constituency;

    @OneToMany(mappedBy = "voterregister1")
    @JsonIgnore
    private List<Castvote> castvotes;
}