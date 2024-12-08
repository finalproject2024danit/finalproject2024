package com.project.project.entities.hobby.db;

import com.project.project.entities.hobby.Hobby;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HobbyRepository extends JpaRepository<Hobby, Long> {
    @Query("SELECT h FROM Hobby h WHERE h.language = :language AND h.pet = :pet AND h.interest = :interest")
    Optional<Hobby> findByLanguageAndPetAndInterest(@Param("language") String language,
                                                    @Param("pet") String pet,
                                                    @Param("interest") String interest);
}
