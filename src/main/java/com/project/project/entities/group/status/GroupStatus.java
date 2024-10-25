package com.project.project.entities.group.status;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum GroupStatus {
    SUCCESS("Success operation."),
    GROUP_NOT_FOUND("Group not found."),
    IS_ALREADY_A_MEMBER("User is already a member of the group."),
    NOT_MEMBER("User is not a member of the group."),
    UNEXPECTED("An unexpected error occurred.");

    private final String message;
}
