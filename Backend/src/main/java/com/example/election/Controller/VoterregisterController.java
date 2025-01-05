package com.example.election.Controller;

import com.example.election.Entity.Voterregister;
import com.example.election.Repository.ConstituencyRepo;
import com.example.election.Repository.VoterregisterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class VoterregisterController {
    @Autowired
    VoterregisterRepo voterregisterrepo;
    @Autowired
    ConstituencyRepo constituencyRepo;
//
//    @Autowired
//    ElectionstaffRepo electionstaffrepo;


    //Post all voter register information based on Constituency
    @PostMapping("/AddVoterRegister/{constituencyid}")
    public ResponseEntity<?> AddVoterRegister(@PathVariable Integer constituencyid, @RequestBody Voterregister obj) {
        var cont = constituencyRepo.findById(constituencyid).orElseThrow(() -> new RuntimeException("Constituency id not found"));
        obj.setConstituency(cont);
        voterregisterrepo.save(obj);
        return new ResponseEntity<>("Voter Details added Successfully", HttpStatus.OK);
    }

    //Get all voter registered details
    @GetMapping("/GetAllVoterRegisterDetails")
    public ResponseEntity<?> GetAllVoterRegisterDetails() {
        List<Voterregister> voterregisterList = voterregisterrepo.findAll();
        return new ResponseEntity<>(voterregisterList, HttpStatus.OK);
    }

    //Login of Voter
    @GetMapping("/Voter/{name}/{password}")
    public ResponseEntity<?> Voter(@PathVariable String name, @PathVariable String password) {
        try {
            Voterregister info = voterregisterrepo.findByName(name)
                    .orElseThrow(() -> new RuntimeException("Voter name not found"));

            if (!info.getPassword().equals(password)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password is incorrect");
            } else {
                return ResponseEntity.ok("Voter Logged in Successfully");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }
    }

    //PUT or Edit
    @PutMapping("/UpdateVoterReg/{voterid}/{constituencyid}")
    public ResponseEntity<?> UpdateVoterReg(@PathVariable String voterid, @PathVariable Integer constituencyid, @RequestBody Voterregister obj) {
        try {
            var voteid = voterregisterrepo.findById(voterid).orElseThrow(() -> new RuntimeException("Voter Register Not Found"));
            voteid.setName(obj.getName());
            voteid.setAge(obj.getAge());
            voteid.setAdharno(obj.getAdharno());
            voteid.setAddress(obj.getAddress());
            voteid.setMobileno(obj.getMobileno());
            voteid.setPassword(obj.getPassword());
            voteid.setFilepath(obj.getFilepath());

            var constituencyinfo = constituencyRepo.findById(constituencyid).orElseThrow(() -> new RuntimeException("Consituency id not found"));
            voteid.setConstituency(constituencyinfo);

            voterregisterrepo.save(voteid);
            return new ResponseEntity<>("Voter Register Updated Successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            if ("Voter Register Not Found".equals(e.getMessage())) {
                return new ResponseEntity<>("Voter ID incorrect", HttpStatus.NOT_FOUND);
            } else if ("Consituency id not found".equals(e.getMessage())) {
                return new ResponseEntity<>("Consituency ID incorrect", HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /* Dispaly Candidate list on "Display Voter Constituency" */
    @GetMapping("/Getnamepswd/{name}/{password}")
    public ResponseEntity<?> Getnamepswd(@PathVariable String name, @PathVariable String password) {
        Optional<Voterregister> voterlist = voterregisterrepo.findByNameAndPassword(name, password);
        return new ResponseEntity<>(voterlist, HttpStatus.OK);
    }

    /* Display only that particular constituencyid's and name Voter information  on "Display Voter Constituency"  front end */
    @GetMapping("/GetByConstituencyId/{constituencyid}/{name}")
    public ResponseEntity<?> getByConstituencyId(@PathVariable Integer constituencyid,@PathVariable String name) {
        List<Voterregister> voterinfo = voterregisterrepo.findByConstituencyConstituencyidAndName(constituencyid,name);
        if (voterinfo.isEmpty()) {
            return new ResponseEntity<>("No Voter for that constituency", HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(voterinfo, HttpStatus.OK);
        }
    }

    /* Display only that particular constituency id's Voter details */
    @GetMapping("/GetByConId/{constituencyid}")
    public ResponseEntity<?> GetByConId(@PathVariable Integer constituencyid) {
        List<Voterregister> vinfo = voterregisterrepo.findByConstituencyConstituencyid(constituencyid);
        if (vinfo.isEmpty()) {
            return new ResponseEntity<>("No Voter for that constituency", HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(vinfo, HttpStatus.OK);
        }
    }
}
