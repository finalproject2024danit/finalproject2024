package com.project.project.entities.groupuser;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;

@Entity
@IdClass(GroupUser.class)
public class GroupUser {

    @Id
    private Long groupUserId;

    @Id
    private Long userId;
}
