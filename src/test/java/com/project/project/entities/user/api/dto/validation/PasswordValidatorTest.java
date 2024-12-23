package com.project.project.entities.user.api.dto.validation;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PasswordValidatorTest {

    private PasswordValidator passwordValidator;

    @BeforeEach
    void setUp() {
        passwordValidator = new PasswordValidator();
    }

    @Test
    void isValid_nullPassword_returnsFalse() {
        assertFalse(passwordValidator.isValid(null, null), "null");
    }

    @Test
    void isValid_emptyPassword_returnsFalse() {
        assertFalse(passwordValidator.isValid("", null), "empty");
    }

    @Test
    void isValid_shortPassword_returnsFalse() {
        assertFalse(passwordValidator.isValid("Ab1", null), "too short");
    }

    @Test
    void isValid_longPassword_returnsFalse() {
        assertFalse(passwordValidator.isValid("A".repeat(21), null), "too long");
    }

    @Test
    void isValid_noUppercase_returnsFalse() {
        assertFalse(passwordValidator.isValid("password", null), "without an uppercase letter");
    }

    @Test
    void isValid_noLowercase_returnsFalse() {
        assertFalse(passwordValidator.isValid("PASSWORD", null), "without a lowercase letter");
    }

    @Test
    void isValid_validPassword_returnsTrue() {
        assertTrue(passwordValidator.isValid("ValidPass123", null), "valid");
    }
}
