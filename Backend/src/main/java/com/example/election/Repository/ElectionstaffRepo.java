package com.example.election.Repository;
import com.example.election.Entity.Electionstaff;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface ElectionstaffRepo extends JpaRepository<Electionstaff,Integer>
{
    Optional<Electionstaff> findByName(String name);
    Optional<Electionstaff> findByNameAndPassword(String name,String password);


}
