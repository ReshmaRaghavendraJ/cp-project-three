package com.example.election.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Constituency
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer constituencyid;
    private String constituency;

    public Constituency()
    {
    }

    public Constituency(Integer constituencyid, String constituency, City city, Electionstaff electionstaff, List<Voterregister> voterregister, List<Candidate> candidate) {
        this.constituencyid = constituencyid;
        this.constituency = constituency;
        this.city = city;
        this.electionstaff = electionstaff;
        this.voterregister = voterregister;
        this.candidate = candidate;
    }

    public Integer getConstituencyid() {
        return constituencyid;
    }

    public void setConstituencyid(Integer constituencyid) {
        this.constituencyid = constituencyid;
    }

    public String getConstituency() {
        return constituency;
    }

    public void setConstituency(String constituency) {
        this.constituency = constituency;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Electionstaff getElectionstaff() {
        return electionstaff;
    }

    public void setElectionstaff(Electionstaff electionstaff) {
        this.electionstaff = electionstaff;
    }

    public List<Voterregister> getVoterregister() {
        return voterregister;
    }

    public void setVoterregister(List<Voterregister> voterregister) {
        this.voterregister = voterregister;
    }

    public List<Candidate> getCandidate() {
        return candidate;
    }

    public void setCandidate(List<Candidate> candidate) {
        this.candidate = candidate;
    }

    @ManyToOne
    private City city;

    @OneToOne(mappedBy ="constituency3")
    @JsonIgnore
    private Electionstaff electionstaff;

    @OneToMany(mappedBy ="constituency")
    @JsonIgnore
    private List<Voterregister> voterregister;

    @OneToMany(mappedBy ="constituency2")
    @JsonIgnore
    private List<Candidate> candidate;

}