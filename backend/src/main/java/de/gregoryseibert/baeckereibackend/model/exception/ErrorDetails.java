package de.gregoryseibert.baeckereibackend.model.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

/**
 * The ErrorDetails class represents several details for an error such as i.e. the message or the timestamp.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Data
public class ErrorDetails {
    private int errorCode;
    private HttpStatus errorName;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss Z")
    private ZonedDateTime date;
    private String message;
    private String details;

    public ErrorDetails(HttpStatus httpStatus, String message, String details) {
        this.date = ZonedDateTime.now();
        this.errorCode = httpStatus.value();
        this.errorName = httpStatus;
        this.message = message;
        this.details = details;
    }
}
