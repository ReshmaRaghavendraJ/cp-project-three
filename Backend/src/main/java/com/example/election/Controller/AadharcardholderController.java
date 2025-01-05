package com.example.election.Controller;

import com.example.election.Entity.Aadharcardholder;
import com.example.election.Repository.AadharcardholderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class AadharcardholderController {
    @Autowired
    AadharcardholderRepo aadharcardholderRepo;

    //post Aadharcardholder Details
    @PostMapping("/AddaadharcardholderDetails")
    public ResponseEntity<?> AddaadharcardholderDetails(@RequestBody Aadharcardholder obj) {
        // Generate random Aadhar card number
        String generatedAadharCardNo = Aadharcardholder.generateRandomAadharCardNo();
        obj.setAadharcardno(generatedAadharCardNo); // Set the generated Aadhar card number
        aadharcardholderRepo.save(obj);
        return new ResponseEntity<>("Aadharcardholder Details added Successfully", HttpStatus.OK);
    }

    //Get Aadharcardholder Details
    @GetMapping("/GetAllaadharcardholderDetails")
    public ResponseEntity<?> GetAllaadharcardholderDetails() {
        List<Aadharcardholder> aadharcardholderList = aadharcardholderRepo.findAll();
        return new ResponseEntity<>(aadharcardholderList, HttpStatus.OK);
    }

    //PUT or Edit
    @PutMapping("/UpdateAadharcardholder/{aadharcardno}")
    public ResponseEntity<?> UpdateAadharcardholder(@PathVariable String aadharcardno, @RequestBody Aadharcardholder obj) {
        try {
            var cardinfo = aadharcardholderRepo.findById(aadharcardno)
                    .orElseThrow(() -> new RuntimeException("Aadharcard no not found"));
            cardinfo.setAddress(obj.getAddress());
            cardinfo.setAge(obj.getAge());
            cardinfo.setMobileno(obj.getMobileno());
            cardinfo.setName(obj.getName());
            aadharcardholderRepo.save(cardinfo);
            return new ResponseEntity<>("Aadharcardholder Updated Successfully", HttpStatus.OK);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>("Invalid Aadharcard number format", HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            if ("Aadharcard no not found".equals(e.getMessage())) {
                return new ResponseEntity<>("Aadharcard no incorrect", HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

