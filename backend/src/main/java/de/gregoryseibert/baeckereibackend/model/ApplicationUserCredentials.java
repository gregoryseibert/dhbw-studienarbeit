package de.gregoryseibert.baeckereibackend.model;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

/**
 * The ApplicationUserCredentials class contains the account credentials which are passed to the rest api.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Data
public class ApplicationUserCredentials {
    @NotEmpty
    private String username;

    @NotEmpty
    private String password;
}
