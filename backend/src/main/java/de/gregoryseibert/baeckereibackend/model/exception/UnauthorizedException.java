package de.gregoryseibert.baeckereibackend.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The UnauthorizedException class is used to represent the HTTP status UNAUTHORIZED.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnauthorizedException(String exception) {
        super(exception);
    }
}