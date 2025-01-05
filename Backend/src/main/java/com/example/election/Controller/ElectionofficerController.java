package com.example.election.Controller;

import com.example.election.Repository.ElectionofficerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class ElectionofficerController
{
    @Autowired
    ElectionofficerRepo electionofferrepo;

    //Login of admin
    @GetMapping("/Electionofficer/{name}/{password}")
    public ResponseEntity<?> Electionofficer(@PathVariable String name, @PathVariable String password) {
        try {
            var info = electionofferrepo.findByname(name)
                    .orElseThrow(() -> new RuntimeException("Admin name not found"));

            if (!info.getPassword().equals(password)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password is incorrect");
            } else {
                return ResponseEntity.ok("Admin Logged in Successfully");
            }
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Admin name not found"))
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin name is incorrect");
            }
            else
            {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
            }
        }
    }
}
