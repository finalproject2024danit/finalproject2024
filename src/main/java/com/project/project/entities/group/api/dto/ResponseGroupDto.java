package com.project.project.entities.group.api.dto;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.dto.AbstractDto;
import com.project.project.entities.post.Post;
import com.project.project.entities.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import static lombok.AccessLevel.PRIVATE;


@FieldDefaults(level = PRIVATE)
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseGroupDto extends AbstractDto {
    @JsonView(View.Admin.class)
    Long id;

    @JsonView(View.Admin.class)
    String name;

    @JsonView(View.Admin.class)
    Boolean isOpen;

    @JsonView(View.Admin.class)
    private Set<User> users;

    @JsonView(View.Admin.class)
    private List<Post> posts;

    @JsonView(View.Admin.class)
    private LocalDateTime createdDate;

    @JsonView(View.Admin.class)
    private LocalDateTime lastModifiedDate;
}
