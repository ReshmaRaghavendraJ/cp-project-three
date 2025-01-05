package com.example.election.Controller;

import com.example.election.Entity.Party;
import com.example.election.Repository.PartyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")

public class PartyController {
    @Autowired
    PartyRepo partyrepo;

    //Post Party Details
    @PostMapping("/Addpartydetails")
    public ResponseEntity<?> Addpartydetails(@RequestBody Party obj) {
        partyrepo.save(obj);
        return new ResponseEntity<>(" Party added Successfully", HttpStatus.OK);
    }

    //Get Party Details
    @GetMapping("/GetAllpartyDetails")
    public ResponseEntity<?> GetAllpartyDetails() {
        List<Party> partyList = partyrepo.findAll();
        return new ResponseEntity<>(partyList, HttpStatus.OK);
    }

    //PUT or Edit
    @PutMapping("/UpdateParty/{partyid}")
    public ResponseEntity<?> UpdateParty(@PathVariable Integer partyid, @RequestBody Party obj) {
        try {
            var partyinfo = partyrepo.findById(partyid).orElseThrow(() -> new RuntimeException("Party id not found"));
            partyinfo.setParty(obj.getParty());
            partyinfo.setPartylogo(obj.getPartylogo());
            partyrepo.save(partyinfo);
            return new ResponseEntity<>("Party Updated Successfully",HttpStatus.OK);
        }
        catch (RuntimeException e) {
            if (e.getMessage().equals("Party id not found")) {
                return new ResponseEntity<>("Party id incorrect", HttpStatus.NOT_FOUND);
            } else {

                return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}



