package com.example.election.Repository;

import com.example.election.Entity.Constituency;
import com.example.election.Entity.Electionstaff;
import com.example.election.Entity.Voterregister;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VoterregisterRepo extends JpaRepository<Voterregister,String>
{
    Optional<Voterregister> findByName(String name);  //Login

    Optional<Voterregister> findByNameAndPassword(String name,String password);  //Display Voter Constituency


    List<Voterregister> findByConstituencyConstituencyidAndName(Integer constituencyid,String name);  //Display in front end based on Voter constituency id and  name

    List<Voterregister> findByConstituencyConstituencyid(Integer constituencyid); //Display based on Voter onstituency id
}
