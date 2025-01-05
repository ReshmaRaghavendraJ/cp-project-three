package com.example.election.Controller;

import com.example.election.Entity.Candidate;
import com.example.election.Entity.Castvote;
import com.example.election.Entity.Electiondate;
import com.example.election.Entity.Voterregister;
import com.example.election.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class CastvoteController {
    @Autowired
    CastvoteRepo castvoteRepo;

    @Autowired
    VoterregisterRepo voterregisterRepo;

    @Autowired
    CandidateRepo candidateRepo;

    @Autowired
    ElectiondateRepo electiondateRepo;

    @Autowired
    ConstituencyRepo constituencyRepo;

    /* Post */
    @PostMapping("/AddCastvotedetails/{voterid}/{candidateid}/{electionid}")
    public ResponseEntity<?> AddCastvotedetails(@PathVariable String voterid, @PathVariable Integer candidateid, @PathVariable Integer electionid) {
        try {
            Voterregister voterreg = voterregisterRepo.findById(voterid)
                    .orElseThrow(() -> new RuntimeException("Voter not found"));

            Electiondate election = electiondateRepo.findById(electionid)
                    .orElseThrow(() -> new RuntimeException("Election not found"));

            Candidate candidate = candidateRepo.findById(candidateid)
                    .orElseThrow(() -> new RuntimeException("Candidate not found"));

            boolean isAlreadyVoted = castvoteRepo.existsByVoterregister1AndElectiondate(voterreg, election);

            if (isAlreadyVoted) {
                return new ResponseEntity<>("Voter already voted in this election", HttpStatus.BAD_REQUEST);
            }

            Castvote castvote = new Castvote();
            castvote.setCandidate1(candidate);
            castvote.setVoterregister1(voterreg);
            castvote.setElectiondate(election);

            castvoteRepo.save(castvote);
            return new ResponseEntity<>("Vote cast successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /* check if a voter has voted after logout */
    @GetMapping("/hasVoted/{voterid}/{electionid}")
    public ResponseEntity<Boolean> hasVoted(@PathVariable String voterid, @PathVariable Integer electionid) {
        try {
            Voterregister voterreg = voterregisterRepo.findById(voterid)
                    .orElseThrow(() -> new RuntimeException("Voter not found"));

            Electiondate election = electiondateRepo.findById(electionid)
                    .orElseThrow(() -> new RuntimeException("Election not found"));

            boolean hasVoted = castvoteRepo.existsByVoterregister1AndElectiondate(voterreg, election);
            return new ResponseEntity<>(hasVoted, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }
}

