package com.example.election.Controller;

import com.example.election.Entity.Castvote;
import com.example.election.Entity.Electiondate;
import com.example.election.Repository.ElectiondateRepo;
import org.antlr.v4.runtime.tree.pattern.ParseTreePattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class ElectiondateController
{
    @Autowired
    ElectiondateRepo electiondateRepo;

    /* Post */
    @PostMapping("/AddElectiondateDetails")
    public ResponseEntity<?> AddElectiondateDetails(@RequestBody Electiondate obj) {
        System.out.println("Start date is :: " + obj.getStartdatetime());
        System.out.println("End date is :: " + obj.getEnddatetime());
        obj.setStatus("Active");
        electiondateRepo.save(obj);
        return new ResponseEntity<>("Electiondate details added successfully.", HttpStatus.OK);
    }

    /* Get All */
    @GetMapping("/Getall")
    public ResponseEntity<?> Getall() {
        List<Electiondate> electionlist = electiondateRepo.findAll();
        return new ResponseEntity<>(electionlist, HttpStatus.OK);
    }

    /* Update */
    @PutMapping("/Updatedate/{electionid}")
    public ResponseEntity<?> Updatedate(@PathVariable Integer electionid, @RequestBody Electiondate obj) {
        try {
            var dateinfo = electiondateRepo.findById(electionid).orElseThrow(() -> new RuntimeException("Election id not found"));
            dateinfo.setStartdatetime(obj.getStartdatetime());
            dateinfo.setEnddatetime(obj.getEnddatetime());
            dateinfo.setElectionname(obj.getElectionname());

            electiondateRepo.save(dateinfo);
            return new ResponseEntity<>("Election date Updated Successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Election id not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Election ID incorrect!");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
            }
        }
    }

    /* Check the current date with startdatetime and enddatetime */
    @GetMapping("/checkDate")
    public ResponseEntity<Map<String, Object>>  checkDate() {
        // Get the current date and time
        LocalDateTime now = LocalDateTime.now();

        // Define the desired date-time format
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

        // Format the current date and time
        String formattedDateTime = now.format(formatter);

        // Print the formatted date and time
        System.out.println("Formatted Date and Time: " + formattedDateTime);
        LocalDateTime currentDate = LocalDateTime.parse(formattedDateTime, formatter);

        // Fetch all election dates from the repository
        List<Electiondate> getAllElectionDates = electiondateRepo.findAll();


        // Initialize response
        Map<String, Object> response = new HashMap<>();
        response.put("responseMessage", "Not Able to vote because of time expired"); // Default message

        for (Electiondate electiondate : getAllElectionDates) {
            LocalDateTime startDate = electiondate.getStartdatetime();
            LocalDateTime endDate = electiondate.getEnddatetime();
            Integer electionid=electiondate.getElectionid();


            // Print the dates for debugging
            System.out.println("currentDate :: " + currentDate);
            System.out.println("startDate :: " + startDate);
            System.out.println("endDate :: " + endDate);

            // Check if the current date is between the start and end dates
            if (currentDate.isAfter(startDate) && currentDate.isBefore(endDate)) {

                response.put("responseMessage", "You can vote Now");
                response.put("electionid", electionid);

                System.out.println(electionid);
                break; // Exit loop once eligibility is confirmed
            }
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
