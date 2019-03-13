package de.gregoryseibert.baeckereibackend.repository;

import de.gregoryseibert.baeckereibackend.model.Ingredient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * The IngredientRepository interface is used to fetch Ingredient objects.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Transactional
public interface IngredientRepository extends CrudRepository<Ingredient, Long> {
    List<Ingredient> findAll();

    Ingredient findByName(String name);

    Ingredient findById(long id);
}
