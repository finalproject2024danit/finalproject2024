package com.project.project.entities.friend.db;

import com.project.project.entities.friend.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {
    @Query(value = """
            SELECT f.* FROM friends f
            JOIN users u ON f.user_from_id = u.id OR f.user_to_id = u.id
            WHERE (u.first_name ILIKE CONCAT('%', ?1, '%'))
              AND (u.id != ?2)
            """, nativeQuery = true)
    List<Friend> findFriendsByFirstNameExcludingSelf(String firstName, Long currentUserId);

    @Query(value = """
            SELECT f.* FROM friends f
            JOIN users u ON f.user_from_id = u.id OR f.user_to_id = u.id
            WHERE (u.first_name ILIKE CONCAT('%', ?1, '%')) 
              AND (u.last_name ILIKE CONCAT('%', ?2, '%')) 
              AND (u.id != ?3)
            """, nativeQuery = true)
    List<Friend> findFriendsByFirstNameAndLastNameExcludingSelf(String firstName, String lastName, Long currentUserId);

    @Modifying
    @Query(value = """
            DELETE FROM friends
            WHERE (user_from_id = ?1 AND user_to_id = ?2)
               OR (user_from_id = ?2 AND user_to_id = ?1)
            """, nativeQuery = true)
    void deleteFriend(Long userId1, Long userId2);
}
