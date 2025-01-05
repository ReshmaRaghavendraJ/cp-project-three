package com.example.election.Repository;

import com.example.election.Entity.Castvote;
import com.example.election.Entity.Electiondate;
import com.example.election.Entity.Voterregister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CastvoteRepo extends JpaRepository<Castvote,Integer>
{
    boolean existsByVoterregister1AndElectiondate(Voterregister voterreg, Electiondate election);

}

