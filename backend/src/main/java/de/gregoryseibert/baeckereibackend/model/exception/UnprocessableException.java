package de.gregoryseibert.baeckereibackend.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The UnprocessableException class is used to represent the HTTP status UNPROCESSABLE.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class UnprocessableException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnprocessableException(String exception) {
        super(exception);
    }
}
