package com.example.election.Repository;

import com.example.election.Entity.Aadharstaff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AadharstaffRepo  extends JpaRepository<Aadharstaff,Integer>
{
    Optional<Aadharstaff> findByname(String name);
}
