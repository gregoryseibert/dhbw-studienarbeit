package de.gregoryseibert.baeckereibackend.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * The BakedGood class represents a baked good.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Data
@MappedSuperclass
public abstract class BakedGood {
    @NotEmpty
    private String name;

    @Lob
    @NotEmpty
    private String characteristic;

    @NotNull
    private Double weight;

    @NotNull
    private Double kcal;

    @NotNull
    private Double fat;

    @NotNull
    private Double carbohydrates;

    @NotNull
    private Double protein;

    private String pictureFilename;

    @NotEmpty
    @OneToMany(cascade = CascadeType.ALL)
    private List<CerealMixPercentage> cerealMix;

    @NotEmpty
    @ManyToMany
    private List<Ingredient> ingredients;
}
