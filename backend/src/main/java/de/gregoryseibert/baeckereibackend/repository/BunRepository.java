package de.gregoryseibert.baeckereibackend.repository;

import de.gregoryseibert.baeckereibackend.model.Bun;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * The BunRepository interface is used to fetch Bun objects.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Transactional
public interface BunRepository extends CrudRepository<Bun, Long> {
    Bun findByName(String name);

    Bun findById(long id);

    List<Bun> findAll();
}
