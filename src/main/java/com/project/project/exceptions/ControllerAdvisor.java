package com.project.project.exceptions;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@Log4j2
@ControllerAdvice
public class ControllerAdvisor {

    @ExceptionHandler({CommentNotFoundException.class, GroupNotFoundException.class, LikeNotFoundException.class,
            MessageNotFoundException.class, NewsNotFoundException.class, PostNotFoundException.class, ResidenceNotFoundException.class,
            UserNotFoundException.class, WorkplaceNotFoundException.class})
    public ResponseEntity<Object> handleNotFound(
            RuntimeException ex) {

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", ex.getLocalizedMessage());
        log.warn(ex);

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({WorkplaceNameExistsException.class, AuthenticationException.class})
    public ResponseEntity<Object> handleOtherException(
            Exception ex) {

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", ex.getLocalizedMessage());
        log.warn(ex);

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
