package com.example.election.Repository;

import com.example.election.Entity.City;
import com.example.election.Entity.Electiondate;
import com.example.election.Entity.Voterregister;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepo extends JpaRepository<City,Integer>
{
    boolean existsByCity(String city);
}
