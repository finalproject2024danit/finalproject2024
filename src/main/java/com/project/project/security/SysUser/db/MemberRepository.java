package com.project.project.security.SysUser.db;


import com.project.project.security.SysUser.SysUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface MemberRepository extends JpaRepository<SysUser, Long> {

    @Query("SELECT u FROM SysUser u WHERE u.userName = :username")
    Optional<SysUser> findByUserName(String username);

    List<SysUser> findAll();

    Optional<SysUser> findById(Long id);
}
