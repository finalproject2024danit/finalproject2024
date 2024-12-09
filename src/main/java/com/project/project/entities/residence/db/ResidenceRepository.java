package com.project.project.entities.residence.db;

import com.project.project.entities.residence.Residence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResidenceRepository extends JpaRepository<Residence, Long> {

    @Query("SELECT r FROM Residence r WHERE r.planet = :planet AND r.country = :country AND r.city = :city")
    Optional<Residence> findByPlanetAndCountryAndCity(@Param("planet") String planet,
                                                      @Param("country") String country,
                                                      @Param("city") String city);
}
