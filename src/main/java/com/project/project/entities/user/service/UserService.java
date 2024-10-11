package com.project.project.entities.user.service;

import com.project.project.entities.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface UserService {
    Page<User> findAllFiltered(Pageable pageable);

    User getUserById(long id);
  
    User addUser(User user);

}
