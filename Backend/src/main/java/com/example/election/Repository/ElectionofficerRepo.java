package com.example.election.Repository;

import com.example.election.Entity.Electionofficer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ElectionofficerRepo extends JpaRepository<Electionofficer,Integer>
{

    Optional<Electionofficer> findByname(String name);
}
