package com.project.project.exceptions;

public class WorkplaceNameExistsException extends RuntimeException {
    public WorkplaceNameExistsException(String message) {
        super(message);
    }
}