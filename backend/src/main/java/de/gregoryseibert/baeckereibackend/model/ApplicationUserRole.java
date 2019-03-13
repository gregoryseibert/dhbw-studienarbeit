package de.gregoryseibert.baeckereibackend.model;

import org.springframework.security.core.GrantedAuthority;

/**
 * The ApplicationUserRole enum contains the various roles a user can have.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

public enum ApplicationUserRole implements GrantedAuthority {
    ROLE_ADMIN, ROLE_USER;

    public String getAuthority() {
        return name();
    }
}