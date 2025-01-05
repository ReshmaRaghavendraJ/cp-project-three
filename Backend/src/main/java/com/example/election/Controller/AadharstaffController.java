package com.example.election.Controller;

import com.example.election.Entity.Aadharstaff;
import com.example.election.Repository.AadharstaffRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class AadharstaffController
{
    @Autowired
    AadharstaffRepo aadharstaffrepo;

    //Post aadharstaff information
    @PostMapping("/Addaadharstaffdetails")
    public ResponseEntity<?> Addaadharstaffdetails(@RequestBody Aadharstaff obj)
    {
        aadharstaffrepo.save(obj);
        return new ResponseEntity<>("Aadharstaff Details added Successfully", HttpStatus.OK);
    }

    //Get All aadharstaff Details
    @GetMapping("/Getallaadharstaffdetails")
    public ResponseEntity<?> Getallaadharstaffdetails()
    {
        List<Aadharstaff> aadharstaffList= aadharstaffrepo.findAll();
        return new ResponseEntity<>(aadharstaffList,HttpStatus.OK);
    }

    //Login of Aadharstaff
    @GetMapping("/aadharstaff/{name}/{password}")
    public ResponseEntity<?> aadharstaff(@PathVariable String name, @PathVariable String password) {
        try {
            var info = aadharstaffrepo.findByname(name)
                    .orElseThrow(() -> new RuntimeException("aadharstaff name not found"));

            if (!info.getPassword().equals(password)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password is incorrect");
            } else {
                return ResponseEntity.ok("aadharstaff Logged in Successfully");
            }
        } catch (RuntimeException e) {
            if (e.getMessage().equals("aadharstaff name not found"))
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("aadharstaff name is incorrect");
            }
            else
            {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
            }
        }
    }

    //PUT or Edit
    @PutMapping("/UpdateAadharstaff/{aadharstaffid}")
    public ResponseEntity<?> UpdateAadharstaff(@PathVariable Integer aadharstaffid,@RequestBody Aadharstaff obj)
    {
        try
        {
        var aadharstaffinfo=aadharstaffrepo.findById(aadharstaffid).orElseThrow(()->new RuntimeException("Aadharstaff id not found"));
        aadharstaffinfo.setAddress(obj.getAddress());
        aadharstaffinfo.setDesignation(obj.getDesignation());
        aadharstaffinfo.setMobileno(obj.getMobileno());
        aadharstaffinfo.setName(obj.getName());
        aadharstaffinfo.setPassword(obj.getPassword());
        aadharstaffrepo.save(aadharstaffinfo);
        return new ResponseEntity<>("Aadharstaff Updatted Successfully",HttpStatus.OK);
    }
        catch (RuntimeException e)
        {
            if(e.getMessage().equals("Aadharstaff id not found"))
            {
                return new ResponseEntity<>("Aadharstaff id is incorrect",HttpStatus.NOT_FOUND);
            }
            else
            {
                return new ResponseEntity<>("Internal Server Error",HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
