package ca.redpocketbackend.exceptions;

import org.springframework.http.HttpStatus;

public class RedPocketException extends RuntimeException {
    private final HttpStatus status;

    public RedPocketException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
