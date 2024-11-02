package com.project.project.entities.user.db;

import com.project.project.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    @Query(value = "SELECT * FROM users WHERE first_name ILIKE CONCAT('%', ?1, '%')", nativeQuery = true)
    List<User> searchByFirstName(String firstName);

    @Query(value = "SELECT * FROM users WHERE first_name ILIKE CONCAT('%', ?1, '%') AND last_name ILIKE CONCAT('%', ?2, '%')", nativeQuery = true)
    List<User> searchByFirstNameAndLastName(String firstName, String lastName);

    @Query("SELECT u FROM User u WHERE u.id IN (" +
            "SELECT f.userToId FROM Friend f WHERE f.userFromId = :userId " +
            "UNION " +
            "SELECT f.userFromId FROM Friend f WHERE f.userToId = :userId)")
    List<User> findFriendsByUserId(Long userId);
}
