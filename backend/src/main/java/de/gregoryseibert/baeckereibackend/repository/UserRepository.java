package de.gregoryseibert.baeckereibackend.repository;


import de.gregoryseibert.baeckereibackend.model.ApplicationUser;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * The ApplicationUserRepository interface is used to fetch ApplicationUser objects.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

public interface UserRepository extends CrudRepository<ApplicationUser, Long> {
    List<ApplicationUser> findAll();

    ApplicationUser findById(long id);

    ApplicationUser findByUsername(String username);

    boolean existsByUsername(String username);
}
