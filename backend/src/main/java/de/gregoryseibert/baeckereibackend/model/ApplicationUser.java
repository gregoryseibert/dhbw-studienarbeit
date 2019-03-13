package de.gregoryseibert.baeckereibackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * The ApplicationUser class represents a user.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Entity
@Data
public class ApplicationUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 5, max = 15, message = "Minimum username length: 5 characters")
    @Column(unique = true, nullable = false, length = 15)
    @NotEmpty
    private String username;

    @JsonIgnore
    @Column(nullable = false)
    @NotEmpty
    private String password;

    @Size(max = 15)
    @Column(length = 30)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @NotEmpty
    @ElementCollection(fetch = FetchType.EAGER)
    private List<ApplicationUserRole> roles;

    private boolean isActive = false;

    private boolean isArchived = false;

    public ApplicationUser() {
        roles = new ArrayList<>();
    }

    public void addRole(ApplicationUserRole role) {
        roles.add(role);
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof ApplicationUser)) {
            return false;
        }

        ApplicationUser user = (ApplicationUser) o;

        return user.getUsername().equals(this.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username);
    }
}