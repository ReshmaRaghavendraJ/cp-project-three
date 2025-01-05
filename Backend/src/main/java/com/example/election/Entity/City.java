package com.example.election.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class City
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer cityid;
    private String city;

    public City()
    {

    }

    public City(Integer cityid, String city, List<Constituency> constituency) {
        this.cityid = cityid;
        this.city = city;
        this.constituency = constituency;
    }

    public Integer getCityid() {
        return cityid;
    }

    public void setCityid(Integer cityid) {
        this.cityid = cityid;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public List<Constituency> getConstituency() {
        return constituency;
    }

    public void setConstituency(List<Constituency> constituency) {
        this.constituency = constituency;
    }

    @OneToMany(mappedBy = "city")
    @JsonIgnore
    private List<Constituency> constituency;
}
