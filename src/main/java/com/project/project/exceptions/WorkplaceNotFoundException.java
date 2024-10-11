package com.project.project.exceptions;

public class WorkplaceNotFoundException extends RuntimeException {
    public WorkplaceNotFoundException(String message) {
        super(message);
    }
}