package de.gregoryseibert.baeckereibackend.controller;

import de.gregoryseibert.baeckereibackend.model.Ingredient;
import de.gregoryseibert.baeckereibackend.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The IngredientController class implements rest endpoints to create, get and modify Ingredient objects.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@RestController
@RequestMapping("/ingredient")
public class IngredientController {
    @Autowired
    private IngredientService ingredientService;

    /**
     * A rest endpoint to create an Ingredient object.
     *
     * @param ingredient The Ingredient object to be created
     * @return The Ingredient object which was created
     */
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Ingredient createIngredient(@RequestBody Ingredient ingredient) {
        return ingredientService.createIngredient(ingredient);
    }

    /**
     * A rest endpoint to get every Ingredient object.
     *
     * @return The list of Ingredient objects
     */
    @GetMapping
    public List<Ingredient> getAllIngredients() {
        return ingredientService.getAllIngredients();
    }

    /**
     * A rest endpoint to update an Ingredient object.
     *
     * @param id         The id of the Ingredient object to be updated
     * @param ingredient The Ingredient object with changed variables
     * @return The Ingredient object which was updated
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Ingredient updateIngredient(@PathVariable int id, @RequestBody Ingredient ingredient) {
        return ingredientService.updateIngredient(id, ingredient);
    }

    /**
     * A rest endpoint to delete a specific Ingredient object by id.
     *
     * @param id The id to search for
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteIngredientById(@PathVariable int id) {
        ingredientService.deleteIngredientById(id);
    }
}