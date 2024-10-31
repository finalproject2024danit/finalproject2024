package com.project.project.entities.user.db;

import com.project.project.entities.user.User;
import com.project.project.entities.user.api.dto.ResponseUserAllDataDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM users WHERE first_name ILIKE CONCAT('%', ?1, '%')", nativeQuery = true)
    List<User> searchByFirstName(String firstName);

    @Query(value = "SELECT * FROM users WHERE first_name ILIKE CONCAT('%', ?1, '%') AND last_name ILIKE CONCAT('%', ?2, '%')", nativeQuery = true)
    List<User> searchByFirstNameAndLastName(String firstName, String lastName);

    @Query(value = "SELECT u.id AS id, u.first_name AS firstName, u.last_name AS lastName, "
            + "u.email AS email, u.gender AS gender, u.date_of_birth AS dateOfBirth, "
            + "u.avatar AS avatar, u.phones AS phones, u.photo_data AS photoData, "
            + "u.created_date AS createdDate, u.last_modified_date AS lastModifiedDate, "
            + "r.id AS residenceId, r.planet AS planet, r.country AS country, r.city AS city "
            + "FROM users u "
            + "LEFT JOIN user_residences ur ON u.id = ur.user_id "
            + "LEFT JOIN residences r ON ur.residence_id = r.id "
            + "WHERE u.id = :userId", nativeQuery = true)
    Optional<ResponseUserAllDataDto> findAllInformationAboutUser(long userId);

    @Query("SELECT u FROM User u WHERE u.id IN (" +
            "SELECT f.userToId FROM Friend f WHERE f.userFromId = :userId " +
            "UNION " +
            "SELECT f.userFromId FROM Friend f WHERE f.userToId = :userId)")
    List<User> findFriendsByUserId(Long userId);
}
