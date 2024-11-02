package com.project.project.exceptions;

public class ResidenceNotFoundException extends RuntimeException {
    public ResidenceNotFoundException(String message) {
        super(message);
    }
}