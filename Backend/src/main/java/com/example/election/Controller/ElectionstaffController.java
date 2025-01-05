package com.example.election.Controller;

import com.example.election.Entity.Constituency;
import com.example.election.Entity.Electionstaff;
import com.example.election.Repository.ConstituencyRepo;
import com.example.election.Repository.ElectionstaffRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")

public class ElectionstaffController {
    @Autowired
    ElectionstaffRepo electionstaffrepo;

    @Autowired
    ConstituencyRepo constituencyRepo;

    //Post Electiostaff Details
    @PostMapping("/AddElectionstaffDetails/{constituencyid}")
    public ResponseEntity<?> AddElectionstaffDetails(@PathVariable Integer constituencyid, @RequestBody Electionstaff obj) {
        Constituency constituencyinfo = constituencyRepo.findById(constituencyid).orElseThrow(() -> new RuntimeException("Constituency id not found"));
        obj.setConstituency3(constituencyinfo);
        electionstaffrepo.save(obj);
        return new ResponseEntity<>("Electionstaff Details added Successfully", HttpStatus.OK);
    }

    //Get  Electionstaff Details
//    @GetMapping("/GetByname/{name}")
//    public ResponseEntity<?> GetByname(@PathVariable String name) {
//        Optional<Electionstaff> ElelectionstaffList = electionstaffrepo.findByName(name);
//        return new ResponseEntity<>(ElelectionstaffList, HttpStatus.OK);
//    }

    //Get by name and password ---for setting Constituencyid session storage
    @GetMapping("/GetBynamepswd/{name}/{password}")
    public ResponseEntity<?> GetBynamepswd(@PathVariable String name, @PathVariable String password) {
        Optional<Electionstaff> ElelectionstaffList = electionstaffrepo.findByNameAndPassword(name, password);
        return new ResponseEntity<>(ElelectionstaffList, HttpStatus.OK);
    }

    @GetMapping("/GetAll")
    public ResponseEntity<?>GetAll()
    {
        List<Electionstaff> list=electionstaffrepo.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //Login of Electionstaff
    @GetMapping("/electionstaff/{name}/{password}")
    public ResponseEntity<?> electionstaff(@PathVariable String name, @PathVariable String password) {
        try {
            var info = electionstaffrepo.findByName(name)
                    .orElseThrow(() -> new RuntimeException("electionstaff name not found"));

            if (!info.getPassword().equals(password)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password is incorrect");
            } else {
                return ResponseEntity.ok("electionstaff Logged in Successfully");
            }
        } catch (RuntimeException e) {
            if (e.getMessage().equals("electionstaff name not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("electionstaff name is incorrect");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
            }
        }
    }

    //PUT or Edit
    @PutMapping("/Updateelectionstaff/{electionstaffid}/{constituencyid}")
    public ResponseEntity<?> Updateelectionstaff(@PathVariable Integer electionstaffid, @PathVariable Integer constituencyid, @RequestBody Electionstaff obj) {
        try {
            var eleic = electionstaffrepo.findById(electionstaffid).orElseThrow(() -> new RuntimeException("Electionstaff id not found"));
            eleic.setName(obj.getName());
            eleic.setDesignation(obj.getDesignation());
            eleic.setMobileno(obj.getMobileno());
            eleic.setAddress(obj.getAddress());
            eleic.setPassword(obj.getPassword());

            var cont = constituencyRepo.findById(constituencyid).orElseThrow(() -> new RuntimeException("Constituency id not found"));
            eleic.setConstituency3(cont);

            electionstaffrepo.save(eleic);
            return new ResponseEntity<>("Electionstaff Updated Successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Electionstaff id not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Electionstaff ID incorrect!");
            } else if (e.getMessage().contains("Constituency id not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Constituency ID incorrect!");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
            }
        }
    }

}
