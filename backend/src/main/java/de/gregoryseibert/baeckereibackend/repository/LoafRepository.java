package de.gregoryseibert.baeckereibackend.repository;

import de.gregoryseibert.baeckereibackend.model.Loaf;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * The LoafRepository interface is used to fetch Loaf objects.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Transactional
public interface LoafRepository extends CrudRepository<Loaf, Long> {
    List<Loaf> findAll();

    Loaf findByName(String name);

    Loaf findById(long id);
}
