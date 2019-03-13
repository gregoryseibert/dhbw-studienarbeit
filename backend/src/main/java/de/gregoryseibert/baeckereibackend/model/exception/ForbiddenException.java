package de.gregoryseibert.baeckereibackend.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The ForbiddenException class is used to represent the HTTP status FORBIDDEN.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@ResponseStatus(HttpStatus.FORBIDDEN)
public class ForbiddenException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public ForbiddenException(String exception) {
        super(exception);
    }
}