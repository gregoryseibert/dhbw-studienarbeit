package de.gregoryseibert.baeckereibackend.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


/**
 * The NotFoundException class is used to represent the HTTP status NOTFOUND.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public NotFoundException(String exception) {
        super(exception);
    }
}