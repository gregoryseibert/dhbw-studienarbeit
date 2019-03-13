package de.gregoryseibert.baeckereibackend.service;

import de.gregoryseibert.baeckereibackend.model.Ingredient;
import de.gregoryseibert.baeckereibackend.model.exception.NotFoundException;
import de.gregoryseibert.baeckereibackend.model.exception.UnprocessableException;
import de.gregoryseibert.baeckereibackend.repository.IngredientRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The IngredientService class is used to create and get Ingredient objects.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Service
public class IngredientService {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IngredientRepository ingredientRepository;

    public Ingredient createIngredient(Ingredient ingredient) {
        if (ingredientRepository.findByName(ingredient.getName()) != null) {
            throw new UnprocessableException(String.format("There is already an ingredient with the name '%s' existing.", ingredient.getName()));
        }

        return ingredientRepository.save(ingredient);
    }

    public List<Ingredient> getAllIngredients() {
        List<Ingredient> ingredientList = ingredientRepository.findAll();

        if (ingredientList.isEmpty()) {
            throw new NotFoundException("There was no ingredient to be found.");
        }

        return ingredientList;
    }

    public Ingredient getIngredientById(long id) {
        Ingredient ingredient = ingredientRepository.findById(id);

        if (ingredient == null) {
            throw new NotFoundException(String.format("There was no ingredient with the id %d to be found.", id));
        }

        return ingredient;
    }

    public Ingredient getIngredientByName(String name) {
        Ingredient ingredient = ingredientRepository.findByName(name);

        if (ingredient == null) {
            throw new NotFoundException(String.format("There was no ingredient with the name '%s' to be found.", name));
        }

        return ingredient;
    }

    public Ingredient updateIngredient(long id, Ingredient ingredient) {
        Ingredient existingIngredient = getIngredientById(id);

        modelMapper.map(ingredient, existingIngredient);

        return ingredientRepository.save(existingIngredient);
    }

    public void deleteIngredientById(long id) {
        Ingredient ingredient = getIngredientById(id);
        ingredientRepository.delete(ingredient);
    }
}
