package com.example.election.Controller;

import com.example.election.Entity.Aadharcardholder;
import com.example.election.Entity.City;
import com.example.election.Repository.CityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class CityController {
    @Autowired
    CityRepo cityRepo;

    //Post City Details
    @PostMapping("/Addcitydetails")
    public ResponseEntity<?> Addcitydetails(@RequestBody City obj)
    {
        boolean isCityAlreadyAdded = cityRepo.existsByCity(obj.getCity());

        if (isCityAlreadyAdded) {
            return new ResponseEntity<>("City name already added", HttpStatus.BAD_REQUEST);
        }
        cityRepo.save(obj);
        return new ResponseEntity<>(" City added Successfully", HttpStatus.OK);
    }

    //Get All City Details
    @GetMapping("/GetAllcityDetails")
    public ResponseEntity<?> GetAllcityDetails() {
        List<City> cityList = cityRepo.findAll();
        return new ResponseEntity<>(cityList, HttpStatus.OK);
    }

    //Put Method (Edit)
    @PutMapping("/Editbasedonid/{cityid}")
    public ResponseEntity<?> Editbasedonid(@PathVariable Integer cityid, @RequestBody City obj) {
        try{
            var cityinfo=cityRepo.findById(cityid).orElseThrow(()->new RuntimeException("City id not found"));
            cityinfo.setCity(obj.getCity());
            cityRepo.save(cityinfo);
            return new ResponseEntity<>("City Updated Successfully",HttpStatus.OK);
        }
        catch (RuntimeException e)
        {
            if(e.getMessage().equals("City id not found"))
            {
                return  new ResponseEntity<>("City id incorrect",HttpStatus.NOT_FOUND);
            }
            else
            {
                return new ResponseEntity<>("Internal Server Error",HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    /* Find city already exists */

}
