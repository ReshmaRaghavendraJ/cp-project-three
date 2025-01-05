package com.example.election.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Candidate
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer candidateid;
    private String name;
    private int age;
    private String address;
    private String mobileno;

    public Candidate()
    {

    }

    public Candidate(Integer candidateid, String name, int age, String address, String mobileno, Constituency constituency2, Party party, List<Castvote> castvote) {
        this.candidateid = candidateid;
        this.name = name;
        this.age = age;
        this.address = address;
        this.mobileno = mobileno;
        this.constituency2 = constituency2;
        this.party = party;
        this.castvote = castvote;
    }

    public Integer getCandidateid() {
        return candidateid;
    }

    public void setCandidateid(Integer candidateid) {
        this.candidateid = candidateid;
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

    public Constituency getConstituency2() {
        return constituency2;
    }

    public void setConstituency2(Constituency constituency2) {
        this.constituency2 = constituency2;
    }

    public Party getParty() {
        return party;
    }

    public void setParty(Party party) {
        this.party = party;
    }

    public List<Castvote> getCastvote() {
        return castvote;
    }

    public void setCastvote(List<Castvote> castvote) {
        this.castvote = castvote;
    }

    @ManyToOne
    @JoinColumn(name="constituencyid")
    private Constituency constituency2;

    @ManyToOne
    @JoinColumn(name="partyid")
    private Party party;

    @OneToMany(mappedBy ="candidate1")
    @JsonIgnore
    private List<Castvote> castvote;

}
