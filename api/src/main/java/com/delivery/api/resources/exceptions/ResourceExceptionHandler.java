package com.delivery.api.resources.exceptions;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.delivery.api.services.exceptions.DatabaseException;
import com.delivery.api.services.exceptions.ResourceNotFoundException;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ResourceExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<StandardError> resourceNotFound(
      ResourceNotFoundException e, HttpServletRequest request) {
    String message = "Resource Not Found";
    HttpStatus status = HttpStatus.NOT_FOUND;
    StandardError error = new StandardError(
        Instant.now(),
        status.value(),
        message,
        e.getMessage(),
        request.getRequestURI());
    return ResponseEntity.status(status).body(error);
  }

  @ExceptionHandler(DatabaseException.class)
  public ResponseEntity<StandardError> databaseException(
      DatabaseException ex, HttpServletRequest request) {
    String message = "Database error";
    HttpStatus status = HttpStatus.BAD_REQUEST;
    StandardError error = new StandardError(
        Instant.now(),
        status.value(),
        message,
        ex.getMessage(),
        request.getRequestURI());
    return ResponseEntity.status(status).body(error);
  }
}
