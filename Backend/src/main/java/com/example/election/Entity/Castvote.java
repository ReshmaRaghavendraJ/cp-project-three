package com.example.election.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class Castvote
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer castvoteid;

    public Castvote()
    {
    }

    public Castvote(Integer castvoteid, Candidate candidate1, Voterregister voterregister1, Electiondate electiondate) {
        this.castvoteid = castvoteid;
        this.candidate1 = candidate1;
        this.voterregister1 = voterregister1;
        this.electiondate = electiondate;
    }

    public Integer getCastvoteid() {
        return castvoteid;
    }

    public void setCastvoteid(Integer castvoteid) {
        this.castvoteid = castvoteid;
    }

    public Candidate getCandidate1() {
        return candidate1;
    }

    public void setCandidate1(Candidate candidate1) {
        this.candidate1 = candidate1;
    }

    public Voterregister getVoterregister1() {
        return voterregister1;
    }

    public void setVoterregister1(Voterregister voterregister1) {
        this.voterregister1 = voterregister1;
    }

    public Electiondate getElectiondate() {
        return electiondate;
    }

    public void setElectiondate(Electiondate electiondate) {
        this.electiondate = electiondate;
    }

    @ManyToOne
    @JoinColumn(name="candidateid")
    private Candidate candidate1;

    @ManyToOne
    @JoinColumn(name = "voterid")
    private Voterregister voterregister1;

    @ManyToOne
    @JoinColumn(name = "electionid")
    private Electiondate electiondate;

}
