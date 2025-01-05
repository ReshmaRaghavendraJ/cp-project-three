package com.example.election.Controller;

import com.example.election.Entity.Candidate;
import com.example.election.Entity.Electiondate;
import com.example.election.Repository.CandidateRepo;
import com.example.election.Repository.ConstituencyRepo;
import com.example.election.Repository.PartyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")

public class CandidateController {
    @Autowired
    CandidateRepo candidateRepo;

    @Autowired
    ConstituencyRepo constituencyRepo;

    @Autowired
    PartyRepo partyRepo;

    //Post all candidate information
    @PostMapping("/AddCandidatedetails/{constituencyid}/{partyid}")
    public ResponseEntity<?> AddCandidatedetails(@PathVariable Integer constituencyid, @PathVariable Integer partyid, @RequestBody Candidate obj) {
        var constituencyinfo = constituencyRepo.findById(constituencyid).orElseThrow(() -> new RuntimeException("Consituency id not found"));
        var partyinfo = partyRepo.findById(partyid).orElseThrow(() -> new RuntimeException("Party id not found"));
        var existingCandidate = candidateRepo.findByConstituency2AndParty(constituencyinfo, partyinfo);
        if (existingCandidate.isPresent()) {
            return new ResponseEntity<>("A candidate from the same party already exists for the given constituency", HttpStatus.CONFLICT);
        }
        obj.setParty(partyinfo);
        obj.setConstituency2(constituencyinfo);
        candidateRepo.save(obj);
        return new ResponseEntity<>("Candidate Details added Successfully", HttpStatus.OK);
    }


    //Get all candidate details
    @GetMapping("/GetAllCandidateDetails")
    public ResponseEntity<?> GetAllCandidateDetails() {
        List<Candidate> candidateList = candidateRepo.findAll();
        return new ResponseEntity<>(candidateList, HttpStatus.OK);
    }

    /*To check for candidate for same party and same constituency*/
    @GetMapping("/GetCandidatesByConstituency/{constituencyid}")
    public ResponseEntity<List<Candidate>> getCandidatesByConstituency(@PathVariable Integer constituencyid) {
        var constituencyinfo = constituencyRepo.findById(constituencyid)
                .orElseThrow(() -> new RuntimeException("Constituency id not found"));
        List<Candidate> candidates = candidateRepo.findByConstituency2(constituencyinfo);
        return new ResponseEntity<>(candidates, HttpStatus.OK);
    }

    //PUT or Edit
    @PutMapping("/UpdateCandidate/{candidateid}/{constituencyid}/{partyid}")
    public ResponseEntity<?> UpdateCandidate(@PathVariable Integer candidateid, @PathVariable Integer constituencyid, @PathVariable Integer partyid, @RequestBody Candidate obj) {
        try {
            var candy = candidateRepo.findById(candidateid).orElseThrow(() -> new RuntimeException("Candidate id Not Found"));
            candy.setName(obj.getName());
            candy.setAge(obj.getAge());
            candy.setAddress(obj.getAddress());
            candy.setMobileno(obj.getMobileno());

            var constituencyinfo = constituencyRepo.findById(constituencyid).orElseThrow(() -> new RuntimeException("Consituency id not found"));
            candy.setConstituency2(constituencyinfo);

            var part = partyRepo.findById(partyid).orElseThrow(() -> new RuntimeException("Party Not Found"));
            candy.setParty(part);

            candidateRepo.save(candy);
            return new ResponseEntity<>("Candidate Updated Successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            if ("Candidate id Not Found".equals(e.getMessage())) {
                return new ResponseEntity<>("Candidate ID incorrect", HttpStatus.NOT_FOUND);
            } else if ("Consituency id not found".equals(e.getMessage())) {
                return new ResponseEntity<>("Consituency ID incorrect", HttpStatus.NOT_FOUND);
            } else if ("Party Not Found".equals(e.getMessage())) {
                return new ResponseEntity<>("Party ID incorrect", HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* Get by constituencyid - Display Voter Constituency (Front End)*/
    @GetMapping("/Getbyid/{constituencyid}")
    public ResponseEntity<?> Getbyid(@PathVariable Integer constituencyid) {
        List<Candidate> candidate = candidateRepo.findByConstituencyId(constituencyid);
        if (candidate.isEmpty()) {
            return new ResponseEntity<>("No Candidates for that constituency", HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(candidate, HttpStatus.OK);
        }
    }

    /* Vote Count */
    @GetMapping("/GetConstituencyVoteCount/{constituencyid}")
    public ResponseEntity<Map<String, Object>> GetConstituencyVoteCount(@PathVariable Integer constituencyid) {
        var constituencyinfo = constituencyRepo.findById(constituencyid)
                .orElseThrow(() -> new RuntimeException("Constituency id not found"));

        List<Candidate> getallCandidates = candidateRepo.findByConstituency2(constituencyinfo);

        // Create a list to store candidate details
        List<Map<String, Object>> candidatesDetails = new ArrayList<>();

        int totalSum = 0;
        for (Candidate candidate : getallCandidates)
        {
            Map<String, Object> candidateDetails = new HashMap<>();

            candidateDetails.put("ConstituencyName", candidate.getConstituency2().getConstituency());
            candidateDetails.put("CandidateName", candidate.getName());
            candidateDetails.put("PartyName", candidate.getParty().getParty());
            candidateDetails.put("PartyLogo", candidate.getParty().getPartylogo());

            Integer voteCount = candidateRepo.countVotesByCandidateId(candidate.getCandidateid());
            voteCount = (voteCount != null) ? voteCount : 0;
            candidateDetails.put("VoteCount", voteCount);

            candidatesDetails.add(candidateDetails);
            totalSum += voteCount;
        }

        Map<String, Object> response = new HashMap<>();
        response.put("Candidates", candidatesDetails);
        response.put("TotalVotes", totalSum);

        return ResponseEntity.ok(response);
    }
}



