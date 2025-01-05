package com.example.election.Repository;

import com.example.election.Entity.Candidate;
import com.example.election.Entity.Constituency;
import com.example.election.Entity.Party;
import com.example.election.Entity.Voterregister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CandidateRepo extends JpaRepository<Candidate,Integer>
{
    Optional<Candidate> findByConstituency2AndParty(Constituency constituency, Party party);

    @Query("SELECT c FROM Candidate c WHERE c.constituency2.constituencyid = :constituencyid")
    List<Candidate> findByConstituencyId(@Param("constituencyid") Integer constituencyid);


    List<Candidate> findByConstituency2(Constituency constituencyinfo);


    //Count the vote
    @Query("SELECT COUNT(v) FROM Castvote v WHERE v.candidate1.candidateid = :candidateid")
    Integer countVotesByCandidateId(@Param("candidateid") Integer candidateid);

}

