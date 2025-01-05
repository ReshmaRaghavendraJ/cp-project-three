package com.example.election.Controller;

import com.example.election.Entity.City;
import com.example.election.Entity.Constituency;
import com.example.election.Repository.CityRepo;
import com.example.election.Repository.ConstituencyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class ConstituencyController
{
    @Autowired
    ConstituencyRepo constituencyRepo;

    @Autowired
    CityRepo cityRepo;

    //Post constituency information based on cityid
    @PostMapping("/AddConstituencydetails/{cityid}")
    public ResponseEntity<?> AddConstituencydetails(@PathVariable Integer cityid,@RequestBody Constituency obj)
    {
            City cityinfo = cityRepo.findById(cityid).orElseThrow(() -> new RuntimeException("city id not found"));
            obj.setCity(cityinfo);
            constituencyRepo.save(obj);
            return new ResponseEntity<>("Details added Successfully", HttpStatus.OK);

    }

    //Get All Constituencies AND //Get All Constituency for Dropdown in Electionstaff
    @GetMapping("/GetAllConstituency")
    public ResponseEntity<?> GetAllConstituency()
    {
        List<Constituency> constituencylist= constituencyRepo.findAll();
        return new ResponseEntity<>(constituencylist,HttpStatus.OK);
    }

    //PUT
    @PutMapping("/updateconstituency/{constituencyid}/{cityid}")
    public ResponseEntity<?> updateconstituency(@PathVariable Integer constituencyid, @PathVariable Integer cityid, @RequestBody Constituency obj) {
        try {
            var cont = constituencyRepo.findById(constituencyid).orElseThrow(() -> new RuntimeException("Constituency not found"));
            cont.setConstituency(obj.getConstituency());

            var cid = cityRepo.findById(cityid).orElseThrow(() -> new RuntimeException("City not found"));
            cont.setCity(cid);

            constituencyRepo.save(cont);
            return new ResponseEntity<>("Constituency Updated Successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Constituency")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Constituency ID incorrect!");
            } else if (e.getMessage().contains("City")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("City ID incorrect!");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
            }
        }
    }
}
