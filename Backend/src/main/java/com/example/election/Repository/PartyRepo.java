package com.example.election.Repository;

import com.example.election.Entity.Party;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartyRepo extends JpaRepository<Party,Integer>
{
}
