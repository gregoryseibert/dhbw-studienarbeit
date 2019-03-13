package de.gregoryseibert.baeckereibackend.model.dto;

import de.gregoryseibert.baeckereibackend.model.CerealMixPercentage;
import de.gregoryseibert.baeckereibackend.model.Ingredient;
import lombok.Data;

import java.util.List;

/**
 * The BakedGoodDTO class represents a DTO for BakedGood.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Data
public abstract class BakedGoodDTO {
    private String name;

    private String characteristic;

    private Double weight;

    private Double kcal;

    private Double fat;

    private Double carbohydrates;

    private Double protein;

    private List<CerealMixPercentage> cerealMix;

    private List<Ingredient> ingredients;
}
