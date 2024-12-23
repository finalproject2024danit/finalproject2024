package com.project.project.entities.user.db;

import com.project.project.entities.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    @Query(value = "SELECT * FROM users WHERE first_name ILIKE CONCAT('%', ?1, '%')", nativeQuery = true)
    List<User> searchByFirstName(String firstName);

    @Query(value = "SELECT * FROM users WHERE first_name ILIKE CONCAT('%', ?1, '%') AND last_name ILIKE CONCAT('%', ?2, '%')", nativeQuery = true)
    List<User> searchByFirstNameAndLastName(String firstName, String lastName);

    @Query("SELECT u FROM User u WHERE u.id IN (" +
            "SELECT f.userToId FROM Friend f WHERE f.userFromId = :userId " +
            "UNION " +
            "SELECT f.userFromId FROM Friend f WHERE f.userToId = :userId)")
    Page<User> findFriendsByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByUserEmail(String email);
}
