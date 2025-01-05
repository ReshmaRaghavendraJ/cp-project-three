package com.example.election.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter

public class Electiondate
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer electionid;
    private String electionname;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Kolkata")
    private LocalDateTime startdatetime;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Kolkata")
    private LocalDateTime enddatetime;

    private String status;

    public Electiondate()
    {

    }

    public Electiondate(Integer electionid, String electionname, LocalDateTime startdatetime, LocalDateTime enddatetime, String status, List<Castvote> castvotes) {
        this.electionid = electionid;
        this.electionname = electionname;
        this.startdatetime = startdatetime;
        this.enddatetime = enddatetime;
        this.status = status;
        this.castvotes = castvotes;
    }

    public Integer getElectionid() {
        return electionid;
    }

    public void setElectionid(Integer electionid) {
        this.electionid = electionid;
    }

    public String getElectionname() {
        return electionname;
    }

    public void setElectionname(String electionname) {
        this.electionname = electionname;
    }

    public LocalDateTime getStartdatetime() {
        return startdatetime;
    }

    public void setStartdatetime(LocalDateTime startdatetime) {
        this.startdatetime = startdatetime;
    }

    public LocalDateTime getEnddatetime() {
        return enddatetime;
    }

    public void setEnddatetime(LocalDateTime enddatetime) {
        this.enddatetime = enddatetime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Castvote> getCastvotes() {
        return castvotes;
    }

    public void setCastvotes(List<Castvote> castvotes) {
        this.castvotes = castvotes;
    }

    @OneToMany(mappedBy = "electiondate")
    @JsonIgnore
    private List<Castvote> castvotes;
}
