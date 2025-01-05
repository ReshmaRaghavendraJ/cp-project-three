package com.example.election.Repository;

import com.example.election.Entity.Constituency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConstituencyRepo extends JpaRepository<Constituency,Integer>
{
}
