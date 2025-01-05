package com.example.election.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Party
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer partyid;
    private String party;
    private String partylogo;

    public Party()
    {

    }

    public Party(Integer partyid, String party, String partylogo, List<Candidate> candidate) {
        this.partyid = partyid;
        this.party = party;
        this.partylogo = partylogo;
        this.candidate = candidate;
    }

    public Integer getPartyid() {
        return partyid;
    }

    public void setPartyid(Integer partyid) {
        this.partyid = partyid;
    }

    public String getParty() {
        return party;
    }

    public void setParty(String party) {
        this.party = party;
    }

    public String getPartylogo() {
        return partylogo;
    }

    public void setPartylogo(String partylogo) {
        this.partylogo = partylogo;
    }

    public List<Candidate> getCandidate() {
        return candidate;
    }

    public void setCandidate(List<Candidate> candidate) {
        this.candidate = candidate;
    }

    @OneToMany(mappedBy ="party")
    @JsonIgnore
    private List<Candidate> candidate;

}


